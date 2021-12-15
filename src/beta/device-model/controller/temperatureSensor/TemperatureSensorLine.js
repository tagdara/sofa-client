import React from 'react';
import TemperatureSensorAvatar from 'beta/device-model/controller/temperatureSensor/TemperatureSensorAvatar'
import { deviceByEndpointId } from 'store/deviceHelpers'
import { Group, Text } from '@mantine/core';

const TemperatureSensorLine = props => {

    const device = deviceByEndpointId(props.endpointId)
    const name = device.friendlyName

    return (
        <Group direction="row" onClick={props.onClick} noWrap grow style={{ width: "100%"}}>
            <TemperatureSensorAvatar endpointId={props.endpointId} />
            <Group direction="column" grow spacing={4}>
                <Text size="lg" lineClamp={1} style={{ flexGrow: 1 }}>{name}</Text>
                { props.children}
            </Group>
        </Group>     
    );
}

export default TemperatureSensorLine;
