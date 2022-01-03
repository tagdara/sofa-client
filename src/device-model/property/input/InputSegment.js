import React from 'react';
import { getInputs } from 'store/deviceHelpers';
import { Select } from '@mantine/core';

const InputSelect = props => {

    console.log('input select props', props)
    const inputs = getInputs(props.device.endpointId)
    const disabled = props.disabled 
    const values = inputs.map(inputChoice => ({value: inputChoice, label:  inputChoice }))
    const value = props.value && props.value.input ? props.value.input : null
 

    return (
        <Select size="sm" disabled={disabled} 
                placeholder={"Input"}
                onChange={props.select} 
                value={value}
                data={values}
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default InputSelect;