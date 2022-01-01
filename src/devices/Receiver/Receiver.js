import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import CardLineSlider from 'components/CardLineSlider'
import { directive } from 'store/directive'
import { getModes } from 'store/deviceHelpers'
import { Collapse, Group, Switch } from '@mantine/core'
import { Speaker } from 'react-feather'

import ReceiverInputSelect from 'devices/Receiver/ReceiverInputSelect'
import ReceiverSurroundSelect from 'devices/Receiver/ReceiverSurroundSelect'
import { useRegister } from 'store/useRegister'

const Receiver = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const volumePresets = [40, 55, 60, 65, 70, 80];
    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState) { return null }

    const on = deviceState.PowerController.powerState.value === 'ON' 
    const volume = deviceState.Speaker.volume.value

    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 
    
    function handlePowerChange(event) {
        event.stopPropagation();
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    
    function surroundName() {
        var surroundmodes = getModes(props.endpointId).Surround
        if (surroundmodes.hasOwnProperty(deviceState.Surround.mode.value)) {
            return surroundmodes[deviceState.Surround.mode.value]
        }
        return ""
    }

    function subText() {
        if (on) {
            return deviceState.InputController.input.value + " / "+ surroundName()
        }
        return null
    }

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    return (
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
                <Collapse in={showDetail || on }>
                    <CardLineSlider on={on} 
                                    step={5}
                                    levels={marks}
                                    marks={marks} 
                                    value={ volume }
                                    change={handleVolumeChange} 
                    />
                </Collapse>
                <Collapse in={showDetail}>
                    <Group direction="column" grow noWrap spacing="sm">
                        <ReceiverSurroundSelect deviceState={deviceState} endpointId={props.endpointId} />
                        <ReceiverInputSelect deviceState={deviceState} endpointId={props.endpointId} />
                    </Group>
                </Collapse>
            </Group>
    );
}

export default Receiver;
