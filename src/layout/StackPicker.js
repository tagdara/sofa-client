import React, { useState } from 'react';
import useLayoutStore from 'store/layoutStore'
import { ActionIcon, Group, Select, Text } from '@mantine/core';
import { usePageFrame } from 'helpers/usePageFrame'
import { IconX } from '@tabler/icons';

const StackPicker = props => {
    const stackLayout = useLayoutStore(state => state.stackLayout )    
    const isMobile = useLayoutStore(state => state.isMobile ) 
    const [ userSelect, setUserSelect ] = useState(false)
    const { maxStacks } = usePageFrame()

    if (!userSelect && (isMobile || (stackLayout.length <= maxStacks))) { 
        return <Text onClick={ () => setUserSelect(true) } weight={600} size="lg" style={props.style}>{props.stack}</Text>
    }

    const selectData = stackLayout.map(stack => ({ value: stack, label: stack }))

    return (
        <Group noWrap>
        <Select onChange={props.setStack} value={ props.stack } 
            placeholder="Pick one"
            data={selectData}
        />
        { userSelect &&
            <ActionIcon onClick={ () => setUserSelect(false) }>
                <IconX size={16}/>
            </ActionIcon>
        }
        </Group>
    )
}

export default StackPicker;
