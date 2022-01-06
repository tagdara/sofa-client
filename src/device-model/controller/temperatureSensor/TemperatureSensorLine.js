import React from 'react';
import TemperatureAvatar from 'device-model/property/temperature/TemperatureAvatar'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import { Group, Text } from '@mantine/core';

const TemperatureSensorLine = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <Group direction="row" onClick={props.onClick} noWrap style={{ width: "100%"}}>
            <TemperatureAvatar endpointId={props.endpointId} size={props.size} />
            <Group direction="column" style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                <Text size={props.size ? props.size : "lg"} lineClamp={1} style={{ flexGrow: 1 }}>{name}</Text>
                { props.children}
            </Group>
        </Group>     
    );
}

export default TemperatureSensorLine;
