import React, { useState } from 'react';
import { Slider } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';

const CardLineSlider = props => {

    const [ value, setValue ] = useState(props.value)

    useDidUpdate(() => {
        setValue(props.value)
    }, [ props.value ])

    const unlabeledMarks = props.marks ? props.marks.map( item => ({ "value": item.value })) : []
    const showMarkLabels = props.marks !== undefined && !props.hideLabels

    const labelItem = props.labels ? props.labels.find( label => label.value === value) : undefined
    const label = labelItem ? labelItem.label : value
    const min = props.min !== undefined ? props.min : ( props.marks !== undefined ? props.marks[0].value: 0 )
    const max = props.max !== undefined ? props.max : ( props.marks !== undefined ? props.marks[props.marks.length-1].value : 100 )

    return (
        <Slider
            label={ label }
            style={{ paddingBottom: showMarkLabels ? 24 : undefined, boxSizing: "border-box", maxWidth: "100%", width: "100%", minWidth: props.minWidth, flexGrow: 1, paddingLeft: 8, paddingRight: 8}}
            onChange={ (val) => setValue(val) }
            onChangeEnd={ (val) => props.change(val)}
            value={ value }
            min={ min }
            max={ max }    
            step={props.step ? props.step : 1 }
            disabled = { !props.on  }
            marks={ showMarkLabels ? props.marks : unlabeledMarks }
        />
    )   

}

export default CardLineSlider