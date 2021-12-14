import React, { useState, useEffect } from 'react';
import CardLine from 'beta/components/CardLine'
import CardLineSlider from 'beta/components/CardLineSlider'
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getModes, register, unregister } from 'store/deviceHelpers'
import { Group, Switch } from '@mantine/core'
import { Speaker } from 'react-feather'
import StackCard from 'beta/components/StackCard'
import ReceiverInputSelect from 'beta/devices/Receiver/ReceiverInputSelect'
import ReceiverSurroundSelect from 'beta/devices/Receiver/ReceiverSurroundSelect'

const Receiver = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const volumePresets = [40, 55, 60, 65, 70, 80];
    const receiver = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Receiver-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Receiver-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!receiver) { return null }

    const on = receiver.PowerController.powerState.value === 'ON' 
    const volume = receiver.Speaker.volume.value

    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 
    
    function handlePowerChange(event) {
        event.stopPropagation();
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    
    function surroundName() {
        var surroundmodes = getModes(props.endpointId).Surround
        if (surroundmodes.hasOwnProperty(receiver.Surround.mode.value)) {
            return surroundmodes[receiver.Surround.mode.value]
        }
        return ""
    }

    function subText() {
        if (on) {
            return receiver.InputController.input.value + " / "+ surroundName()
        }
        return null
    }

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    return (
        <StackCard>
            <Group direction="column" grow noWrap spacing="xl">
                <CardLine   arrow avatar={ <Speaker /> }
                            color={ on ? "primary" : undefined}
                            primary={"Receiver"}
                            secondary={subText()}
                            onClick={ () => setShowDetail(!showDetail)}
                >
                    <Switch checked={ on }
                            onClick={stopEventPropagation} 
                            onChange={ handlePowerChange } 
                    />
                </CardLine>
                { (showDetail || on ) &&
                <CardLineSlider on={on} 
                                step={5}
                                levels={marks}
                                marks={marks} 
                                value={ volume }
                                change={handleVolumeChange} 
                    />
                }
                { showDetail && <ReceiverSurroundSelect receiver={receiver} endpointId={props.endpointId} /> }
                { showDetail && <ReceiverInputSelect receiver={receiver} endpointId={props.endpointId} /> }
            </Group>
        </StackCard>
    );
}

export default Receiver;
