import React from 'react';
import { Text } from '@mantine/core';
import { useRegister } from 'endpoint-model/register/useRegister'

const RangeValueText = props => {

    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState || !deviceState.hasOwnProperty(props.instance)) { return null }

    const value = deviceState[props.instance].rangeValue.value

    return (
        <div style={{ display: "flex", flexWrap: "noWrap", alignItems: "baseline"}}>
            <Text weight={500}>{ value }</Text>
            { props.unit && <Text style={{ paddingLeft: 2 }} color="dimmed" size="xs">{ props.unit}</Text> }
        </div>
    );
}

export default RangeValueText;
