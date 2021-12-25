import React from 'react';
import { getModes, isModeNonControllable } from 'store/deviceHelpers';
import { Select } from '@mantine/core';

const ModeSelect = props => {

    const modes = getModes(props.endpointId)
    const modeData = modes[props.instance]
    const disabled = props.disabled || isModeNonControllable(props.endpointId, props.mode)

    const values = Object.keys(modeData).map(modeChoice => ({value: modeChoice, label: modeData[modeChoice]}))
    const mode = props.value && props.value.mode ? props.value.mode : null

    return (
        <Select size="sm" disabled={disabled} 
                placeholder={props.instance}
                onChange={props.select} 
                value={mode}
                data={values}
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default ModeSelect;