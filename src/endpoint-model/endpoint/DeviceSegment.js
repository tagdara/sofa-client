import React from 'react';
import { Button } from '@mantine/core';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'
import { HelpCircle } from 'react-feather';

const DeviceSegment = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    if (!props.endpointId || !name) {
        return  <Button compact 
                    radius="md"
                    color="red"
                    onClick={props.onClick}
                    leftIcon={props.icon ? <HelpCircle size={12} /> : undefined }
                    variant="light" size={props.size ? props.size : "sm"}
                >
                    {!props.endpointId ? "No device" : "Missing device "+props.endpointId}
                </Button> 
    }

    return (
        <Button compact 
                radius="md"
                onClick={props.onClick}
                leftIcon={ props.icon ? <EndpointIcon size={12} endpointId={props.endpointId} /> : undefined }
                variant="light" size={props.size ? props.size : "sm"}>{name}</Button> 
    )
}

export default DeviceSegment;