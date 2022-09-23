import React from 'react';
import useInput from 'endpoint-model/property/input/useInput'
import CardSegmentedControl from 'layout/components/CardSegmentedControl'

const InputSegmentedControl = props => {

    const { inputValue, selections, selectInput } = useInput(props.endpointId, props.value, props.directive)
    const disabled = props.disabled 

    return (
        <CardSegmentedControl
                style={{ flexGrow: 1 }}
                size="sm"
                value={ inputValue }
                data={ selections }
                onChange={ selectInput } 
                disabled={ disabled || props.disabled }
        />         
    )
}

export default InputSegmentedControl