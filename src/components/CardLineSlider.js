import React, { useState } from 'react';
import { Slider } from '@mantine/core';
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

const CardLineSlider = props => {

    const theme = useMantineTheme(); 
    const [ value, setValue ] = useState(props.value)
    const [ userValue, setUserValue] = useState(false)
    const [ debounced ] = useDebouncedValue( value, props.delay ? props.delay : 300 );

    useDidUpdate(() => {
        setUserValue(false)
        setValue(props.value)
    }, [ props.value ])

    useDidUpdate(() => {
        if (debounced !== undefined && userValue) {
            console.log('>> sending value change', debounced)
            props.change(debounced)
        }
    }, [ debounced ])

    const setValueByUser = (val) => {
        setUserValue(true)
        setValue(val)
    } 

    const showMarkLabels = props.marks !== undefined && !props.hideLabels
    const disabled = theme.colorScheme === 'dark' ? 
                        { 
                            root: { display: "flex", flex: 1, padding: showMarkLabels ? "8px 8px 32px 8px" : undefined },
                            markLabel: { display: !showMarkLabels ? 'none' : undefined }, 
                            track: { backgroundColor: theme.colors.dark[7] }, 
                            bar: { backgroundColor: theme.colors.dark[4] }, 
                            mark: { backgroundColor:  theme.colors.dark[6], borderColor: theme.colors.dark[4] },
                            markFilled: { backgroundColor:  theme.colors.dark[6], borderColor: theme.colors.dark[3] },
                            thumb: { backgroundColor:  theme.colors.dark[6], borderColor: theme.colors.dark[3] } }
                        :
                        {   root: {   display: "flex", flex: 1, padding: showMarkLabels ? "8px 8px 32px 8px" : undefined },
                            markLabel: { display: !showMarkLabels ? 'none' : undefined }, 
                            track: { backgroundColor: theme.colors.gray[1] }, 
                            bar: { backgroundColor: theme.colors.gray[4] }, 
                            thumb: { backgroundColor:  theme.colors.gray[1], borderColor: theme.colors.gray[4] } }

    const enabled =     { 
                            root: {  display: "flex", flex: 1, padding: showMarkLabels ? "8px 8px 32px 8px" : undefined },
                            markLabel: {display: !showMarkLabels ? 'none' : undefined }, 
                        }

    const labelItem = props.labels ? props.labels.find( label => label.value === value) : undefined
    const label = labelItem ? labelItem.label : value
    const min = props.min ? props.min : ( props.marks ? props.marks[0].value: 0 )
    const max = props.max ? props.max : ( props.marks ? props.marks[props.marks.length-1].value : 100 )

    return (
        <Slider
            label={ label }
            style={{ boxSizing: "border-box", maxWidth: "100%", width: "100%", minWidth: props.minWidth, flexGrow: 1, paddingLeft: 8, paddingRight: 8}}
            onChange={ (val) => setValueByUser(val) }
            value={ value }
            min={ min }
            max={ max }    
            step={props.step ? props.step : 1 }
            disabled = { !props.on  }
            marks={ props.marks }
            styles={ !props.on ? disabled : enabled }
        />
    )
}

export default CardLineSlider