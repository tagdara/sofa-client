import React from 'react';
import useLayoutStore from 'store/layoutStore'
import { Select, Text } from '@mantine/core';
import { usePageFrame } from 'device-model/instance/PageFrame'

const StackPicker = props => {
    const stackLayout = useLayoutStore(state => state.stackLayout )    
    const isMobile = useLayoutStore(state => state.isMobile ) 
    const { maxStacks } = usePageFrame()

    if (isMobile || (stackLayout.length <= maxStacks)) { 
        return <Text weight={600} size="lg">{props.stack}</Text>
    }

    const selectData = stackLayout.map(stack => ({ value: stack, label: stack }))

    return (
        <Select onChange={props.setStack} value={ props.stack } 
            placeholder="Pick one"
            data={selectData}
        />
    )
}

export default StackPicker;
