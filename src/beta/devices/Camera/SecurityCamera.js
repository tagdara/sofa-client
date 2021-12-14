import React from 'react';
import CameraImage from 'beta/devices/Camera/CameraImage';
import StackCard from 'beta/components/StackCard'
import { Card, Group, Text } from '@mantine/core';
import { deviceByEndpointId } from 'store/deviceHelpers'
const SecurityCamera = props => {

    const refreshInterval = 3000
    const device = deviceByEndpointId(props.endpointId)

    return (
        <StackCard>
            <Card.Section>
            <CameraImage endpointId={props.endpointId} 
                            name={"Camera"}
                            refreshInterval={refreshInterval} 
            />
            </Card.Section>
            <Group grow style={{ width: "100%"}}>
                <Text>{device.friendlyName}</Text>
            </Group>
        </StackCard>
    );
}

export default SecurityCamera;
