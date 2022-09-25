import React from 'react';
import { Select } from '@mantine/core';
import useInput from 'endpoint-model/property/input/useInput'

const InputSelect = props => {

    const { inputValue, selections, selectInput } = useInput(props.endpointId, props.value, props.directive)
    const disabled = props.disabled 

    return (
        <Select size="sm" disabled={disabled}
                dropdownPosition={"top"}
                withinPortal={true}
                placeholder={"Input"}
                onChange={ selectInput } 
                value={ inputValue }
                data={ selections }
                style={{ zIndex: 3000, width: props.half ? "50%" : undefined }}
        />
    )
}

export default InputSelect;