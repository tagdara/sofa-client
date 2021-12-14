import React from 'react';
import { directive } from 'store/directive'
import { getInputs } from 'store/deviceHelpers'
import { ActionIcon, Group } from '@mantine/core'
import { Lock, Unlock } from 'react-feather'
import CardSegmentedControl from 'beta/components/CardSegmentedControl'

const Receiver = props => {
  
    const receiver = props.receiver

    if (!receiver) { return null }

    const on = receiver.PowerController.powerState.value === 'ON' 
    const inputs = getInputs(props.endpointId)
 
    function inputSelect() {
        return inputs.map( inp => { return { label : inp, value : inp}})
    }
    
    function handleInput(inputname) {
        directive(props.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 

    function handleInputLockModeChoice(event,modechoice) {
        directive(props.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Receiver.InputLock')
    }; 

    const locked = receiver.InputLock.mode.value === 'InputLock.Locked' 

    return (
        <Group noWrap style={{ width: "100%", position: 'relative' }} position="apart">
            <CardSegmentedControl
                style={{ flexGrow: 1, maxWidth: "75%"}}
                size="sm"
                value={ receiver.InputController.input.value }
                data={ inputSelect() }
                onChange={ handleInput } 
                disabled={!on}
            />             
            <ActionIcon variant={ "filled" } 
                        color={ locked ? "primary" : undefined }
                        size="lg"
                        disabled={!on}
                        onClick={ (e) => handleInputLockModeChoice(e, (receiver.InputLock.mode.value==='InputLock.Locked' ? 'InputLock.Unlocked' : 'InputLock.Locked'))} 
            >
                { locked ? <Lock size={20} /> : <Unlock size={20} /> }
            </ActionIcon>          
        </Group>
    );
}

export default Receiver;
