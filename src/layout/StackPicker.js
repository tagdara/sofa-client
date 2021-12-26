import React from 'react';
import useLayoutStore from 'store/layoutStore'
import { Select, Text } from '@mantine/core';

const StackPicker = props => {
    const stackLayout = useLayoutStore(state => state.stackLayout )    
    const isMobile = useLayoutStore(state => state.isMobile ) 
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const maxStacks = Math.min(4, Math.round( maxScreenWidth / minStackWidth))

    // using length -1 to skip admin but probably a better way
    if (isMobile || (stackLayout.length -1 <= maxStacks)) { 
        return <Text weight={600} size="lg">{props.stack}</Text>
    }

    const selectData = stackLayout.map(stack => ({ value: stack, label: stack }))

    return (
        <Select onChange={ (e)=> props.setStack(e.target.value)} value={ props.stack } 
            placeholder="Pick one"
            data={selectData}
        />
    )
}

export default StackPicker;
