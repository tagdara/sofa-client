import React from 'react';
import CameraImage from 'beta/devices/Camera/CameraImage';
import { Card } from '@mantine/core';

const SecurityCamera = props => {

    const refreshInterval = 3000

    return (
        <Card>
            <Card.Section>
            <CameraImage endpointId={props.endpointId} 
                            name={"Camera"}
                            refreshInterval={refreshInterval} 
            />
            </Card.Section>
        </Card>
    );
}

export default SecurityCamera;
