import React from 'react';
import { Group, Select, Text } from '@mantine/core';
import useMode from 'device-model/property/mode/useMode'

const ModeSelect = props => {

    const { mode, instance, selections, disabled, setMode } = useMode( props.endpointId, props.instance, props.value, props.directive )

    return (
        <Group noWrap>
            { props.label && <Text>{props.label}</Text> } 
            <Select size={ props.size ? props.size : "sm" } 
                    disabled={ disabled } 
                    placeholder={ instance }
                    onChange={ setMode } 
                    value={ mode }
                    data={ selections }
                    style={{  minWidth: 100, width: props.half ? "50%" : "auto" }}
            />
        </Group>
    )
}

export default ModeSelect;