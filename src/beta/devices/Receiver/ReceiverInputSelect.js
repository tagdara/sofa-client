import React from 'react';
import { directive } from 'store/directive'
import { getInputs } from 'store/deviceHelpers'
import { ActionIcon, Center, Group, Space, Text } from '@mantine/core'
import { Lock, Unlock } from 'react-feather'
import CardSegmentedControl from 'beta/components/CardSegmentedControl'

const Receiver = props => {
  
    const receiver = props.deviceState

    if (!receiver) { return null }

    const on = receiver.PowerController.powerState.value === 'ON' 
    const inputs = getInputs(props.endpointId)

    function inputSelect() {
        return inputs.map( inp => { return { label : makeInput(inp), value : inp} } )
    }

    function makeInput(inp) {
        if (inp === "Audio") {
            return <Center>
                        <Text size="sm">{inp}</Text>
                        <Space w="xl" />
                        <ActionIcon color={ locked ? "primary" : undefined } 
                                    size={"sm"}
                                    disabled={!on}
                                    variant={ "filled" }
                                    onClick={ (e) => handleInputLockModeChoice(e, (receiver.InputLock.mode.value==='InputLock.Locked' ? 'InputLock.Unlocked' : 'InputLock.Locked'))} 
                        > 
                            { locked ? <Lock size={16} /> : <Unlock size={16} /> }
                        </ActionIcon>
                    </Center>
        }
        return <Center><Text size="sm">{inp}</Text></Center>
    }
    
    function handleInput(inputname) {
        directive(props.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 

    function handleInputLockModeChoice(event,modechoice) {
        event.stopPropagation()
        directive(props.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Receiver.InputLock')
    }; 

    const locked = receiver.InputLock.mode.value === 'InputLock.Locked' 

    return (
        <Group noWrap style={{ width: "100%", position: 'relative' }} position="apart">
            <CardSegmentedControl
                style={{ flexGrow: 1 }}
                size="sm"
                value={ receiver.InputController.input.value }
                data={ inputSelect() }
                onChange={ handleInput } 
                disabled={!on}
            />                 
        </Group>
    );
}

export default Receiver;
