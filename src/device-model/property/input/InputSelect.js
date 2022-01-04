import React from 'react';
import { Select } from '@mantine/core';
import useInput from 'device-model/property/input/useInput'

const InputSelect = props => {

    const { inputValue, selections, selectInput } = useInput(props.endpointId, props.value, props.directive)
    const disabled = props.disabled 

    return (
        <Select size="sm" disabled={disabled} 
                placeholder={"Input"}
                onChange={ selectInput } 
                value={ inputValue }
                data={ selections }
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default InputSelect;