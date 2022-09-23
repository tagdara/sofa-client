import React from 'react';
import TemperatureAvatar from 'endpoint-model/property/temperature/TemperatureAvatar'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { Group, Stack, Text } from '@mantine/core';

const TemperatureSensorLine = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <Group onClick={props.onClick} noWrap style={{ width: "100%"}}>
            <TemperatureAvatar endpointId={props.endpointId} size={props.size} />
            <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                <Text size={props.size ? props.size : "lg"} lineClamp={1} style={{ flexGrow: 1 }}>{name}</Text>
                <Group noWrap>
                    { props.children}
                </Group>
            </Stack>
        </Group>     
    );
}

export default TemperatureSensorLine;
