import React from 'react';
import { Text } from '@mantine/core';
import { useRegister } from 'endpoint-model/register/useRegister'
// import { getControllerInterface } from 'endpoint-model/discovery'

const RangeValueText = props => {

    const { deviceState } = useRegister(props.endpointId)
    // const controller = getControllerInterface(props.endpointId, props.instance)

    if (!deviceState || !deviceState.hasOwnProperty(props.instance)) { return null }

    const value = deviceState[props.instance].rangeValue.value

    return (
        <div style={{ display: "flex", flexWrap: "noWrap", alignItems: "baseline"}}>
            <Text size={props.size ? props.size : "xs"} weight={500}>{ value }</Text>
            { <Text style={{ minWidth: 42, paddingLeft: 4 }} color="dimmed" size={props.size ? props.size : "xs"}>{ props.unit ? props.unit : " "}</Text> }
        </div>
    );
}

export default RangeValueText;
