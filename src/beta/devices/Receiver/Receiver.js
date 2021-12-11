import React, { useState, useEffect } from 'react';
import CardLine from 'beta/components/CardLine'
import CardLineSlider from 'beta/components/CardLineSlider'
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getModes, getInputs, register, unregister } from 'store/deviceHelpers'
import { Card, Group, SegmentedControl, Switch } from '@mantine/core'
import { Speaker } from 'react-feather'

const Receiver = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    //const [ volumePresetMode, setVolumePresetMode ] = useState(true);
    const volumePresets = [40, 55, 60, 65, 70, 80];

    //const device = deviceByEndpointId(props.endpointId)
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
    const inputs = getInputs(props.endpointId)
 
    function inputSelect() {
        return inputs.map( inp => { return { label : inp, value : inp}})
     }
    
    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 
    
    function handlePowerChange(event) {
        event.stopPropagation();
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    //function handleInput(inputname) {
    //    directive(props.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    //}; 

    
    function surroundName() {
        var surroundmodes = getModes(props.endpointId).Surround
        if (surroundmodes.hasOwnProperty(receiver.Surround.mode.value)) {
            return surroundmodes[receiver.Surround.mode.value]
        }
        return ""
    }
    
    //function handleInputLockModeChoice(event,modechoice) {
    //    directive(props.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Receiver.InputLock')
    //}; 

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
        <Card style={{ width: "100%"}}>
            <Group direction="column" grow noWrap spacing="lg">
                <CardLine   arrow icon={ <Speaker size={20} /> }
                            primary={"Receiver"}
                            secondary={subText()}
                            onClick={ () => setShowDetail(!showDetail)}
                >
                    <Switch checked={ on }
                            onClick={stopEventPropagation} 
                            onChange={ handlePowerChange } 
                    />
                </CardLine>
                { showDetail && 
                <Group grow>
                    <SegmentedControl
                        fullWidth
                        size="xs"
                        value={ receiver.InputController.input.value }
                        data={ inputSelect() }
                    />                       
                </Group>
                }
                { (showDetail || on ) &&
                <CardLineSlider on={on} 
                                step={5}
                                levels={marks}
                                marks={marks} 
                                value={ volume }
                                change={handleVolumeChange} 
                    />
                }
            </Group>
        </Card>
    );
}

export default Receiver;
