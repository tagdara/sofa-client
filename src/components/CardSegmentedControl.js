import React, { useState, useEffect } from 'react';
import { SegmentedControl } from '@mantine/core'
import { useMantineTheme } from '@mantine/core';

const CardSegmentedControl = props => {

    console.log('props', props)

    const theme = useMantineTheme();
    const [ value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [ props.value])

    const change = data => {
        setValue(data)
        props.onChange(data)
    }

    if (!value) { return null }

    return (
        <SegmentedControl             
            size={props.size}
            value={ value ? value : ""}
            data={ props.data }
            onChange={ props.disabled ? undefined : change }
            style={props.style}
            styles={{   
                root: {
                    backgroundColor: theme.colorScheme === 'dark' ? 
                        theme.colors.dark[5] : 
                        theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1),                    
                },
                controlActive: {
                    borderRadius: 4,
                    backgroundColor: props.disabled ?
                        ( theme.colorScheme === 'dark' ? 
                            theme.colors.dark[4]  : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][1], 0.1) 
                        )                    
                    :
                        ( theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][1], 0.1) 
                        )
                }
            }}
        />             
    );
}

export default  CardSegmentedControl;
