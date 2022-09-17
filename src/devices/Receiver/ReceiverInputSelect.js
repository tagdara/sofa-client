import React from 'react';
import { ActionIcon, Center, Group, Space, Text } from '@mantine/core'
import { IconLock, IconLockOpen } from '@tabler/icons';
import CardSegmentedControl from 'components/CardSegmentedControl'
import useMode from 'endpoint-model/property/mode/useMode'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useInput from 'endpoint-model/property/input/useInput'

const ReceiverInputSelect = props => {

    // This is similar to a standard Input Select but includes a locking capability based off of 
    // a mode (which should eventually be changed to a toggle)

    // This component is needed to overlay the additional logic

    // A better model would be to have the lock sit next to the control and when locked, disable user
    // changes as well
  
    const { inputValue, inputs, selectInput } = useInput(props.endpointId)
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const { mode, setMode } = useMode(props.endpointId, 'Receiver.InputLock')
    const locked = mode === 'InputLock.Locked' 

    const modeToggleClick = ( event) => {
        event.stopPropagation()
        console.log('mode', mode, locked)
        setMode( locked ? 'InputLock.Unlocked' : 'InputLock.Locked')
    }

    const makeCustomSegmentLabel = inp => {
        if (inp === "Audio") {
            return <Center>
                        <Text size="sm">{inp}</Text>
                        <Space w="xl" />
                        <ActionIcon color={ locked ? "primary" : undefined } 
                                    size={"sm"}
                                    disabled={!on}
                                    variant={ "filled" }
                                    onClick={ modeToggleClick } 
                        > 
                            { locked ? <IconLock size={16} /> : <IconLockOpen size={16} /> }
                        </ActionIcon>
                    </Center>
        }
        return (
            <Center>
                <Text size="sm">
                    {inp}
                </Text>
            </Center>
        )
    }

    const selections = inputs.map( inp => { return { label : makeCustomSegmentLabel(inp), value : inp} } )

    return (
        <Group noWrap style={{ width: "100%", position: 'relative' }} position="apart">
            <CardSegmentedControl
                style={{ flexGrow: 1 }}
                size="sm"
                value={ inputValue }
                data={ selections }
                onChange={ selectInput } 
                disabled={ !on }
            />                 
        </Group>
    );
}

export default ReceiverInputSelect;
