import React from 'react';
import { Badge } from '@mantine/core';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const DeviceBadge = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <Badge lesize={props.size}>{name}</Badge> 
    )
}

export default DeviceBadge;