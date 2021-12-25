import React from 'react';
import { getModes, isModeNonControllable } from 'store/deviceHelpers';
import { Select } from '@mantine/core';

const ModeSelect = props => {

    const modes = getModes(props.endpointId)
    const instance = props.instance.includes('.') ? props.instance.split('.')[1] : props.instance
    const modeData = modes[instance]

    const disabled = props.disabled || isModeNonControllable(props.endpointId, props.value)

    const values = Object.keys(modeData).map(modeChoice => ({value: modeChoice, label: modeData[modeChoice]}))

    const mode = props.value && props.value.mode ? props.value.mode : null
  

    return (
        <Select size="sm" disabled={disabled} 
                placeholder={instance}
                onChange={props.select} 
                value={mode}
                data={values}
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default ModeSelect;