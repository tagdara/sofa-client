import React, { useState } from 'react';
import CameraImage from 'beta/devices/Camera/CameraImage';
import StackCard from 'beta/components/StackCard'
import { Card, Group, Text } from '@mantine/core';
import { deviceByEndpointId } from 'store/deviceHelpers'
import { selectPage } from 'beta/helpers/layoutHelpers'
import CameraVideo from 'beta/devices/Camera/CameraVideo'

const SecurityCamera = props => {

    // Unifi Protect will not return a new image faster than once per 10 seconds, and intermediate images
    // will be duplicates
    // https://github.com/briis/unifiprotect/issues/46

    const refreshInterval = 10000 
    const [live, setLive] = useState(false)
    const device = deviceByEndpointId(props.endpointId)

    const imageClick = () => {
        if (props.onClick) { 
            props.onClick()
        } else {
            console.log('selecting')
            selectPage('CameraLayout')
        }
    }

    if (!device) { return null }

    return (
        <StackCard>
            <Card.Section>
            { live ?
                <CameraVideo endpointId={props.endpointId} />
            :
                <CameraImage endpointId={props.endpointId} 
                                name={"Camera"}
                                refreshInterval={refreshInterval} 
                                onClick={imageClick}
                />
            }
            </Card.Section>
            <Group grow style={{ width: "100%"}}>
                <Text onClick={ () => setLive(!live)}>{device.friendlyName}</Text>
            </Group>
        </StackCard>
    );
}

export default SecurityCamera;
