import React, { useState } from 'react';
import CameraImage from 'devices/Camera/CameraImage';
import StackCard from 'layout/components/StackCard'
import { Alert, Card, Group, Text } from '@mantine/core';
import { endpointByEndpointId } from 'endpoint-model/discovery'
// import { selectPage } from 'helpers/layoutHelpers';
import CameraVideo from 'devices/Camera/CameraVideo'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import { IconDeviceCctvOff } from '@tabler/icons';

const SecurityCamera = props => {

    // Unifi Protect will not return a new image faster than once per 10 seconds, and intermediate images
    // will be duplicates
    // https://github.com/briis/unifiprotect/issues/46

    const refreshInterval = 11
    const [live, setLive] = useState(false)
    const device = endpointByEndpointId(props.endpointId)
    const { connectivityBool, hasEndpointHealth } = useEndpointHealth(props.endpointId)


    const imageClick = () => {
        setLive(!live)
        // if (props.onClick) { 
        //     props.onClick()
        // } else {
        //     selectPage('CameraPage')
        // }
    }

    if (!device) { return null }

    if (hasEndpointHealth && !connectivityBool) {
        return (
            <Alert 
                icon={<IconDeviceCctvOff size={16} />} 
                title={device.friendlyName} 
                color="red"
            >
            This camera is offline.
          </Alert>
        )
    }

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
                                noLabel={props.noLabel}
                />
            }
            </Card.Section>
            { !props.noLabel &&
                <Group grow style={{ paddingTop: 8, width: "100%"}}>
                    <Text size="sm" onClick={ () => setLive(!live)}>{device.friendlyName}</Text>
                </Group>
            }
        </StackCard>
    );
}

export default SecurityCamera;
