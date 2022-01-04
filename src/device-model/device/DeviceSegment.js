import React from 'react';
import { Button } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import DeviceIcon from 'components/DeviceIcon'
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
                    {"No device"}
                </Button> 
    }

    return (
        <Button compact 
                radius="md"
                onClick={props.onClick}
                leftIcon={ props.icon ? <DeviceIcon size={12} endpointId={props.endpointId} /> : undefined }
                variant="light" size={props.size ? props.size : "sm"}>{name}</Button> 
    )
}

export default DeviceSegment;