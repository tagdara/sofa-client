import React from 'react';
import { Select } from '@mantine/core';
import useMode from 'device-model/property/mode/useMode'

const ModeSelect = props => {

    const { mode, instance, selections, disabled, setMode } = useMode(props.endpointId, props.instance, props.value, props.directive)

    return (
        <Select size="sm" 
                disabled={ disabled } 
                placeholder={ instance }
                onChange={ setMode } 
                value={ mode }
                data={ selections }
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default ModeSelect;