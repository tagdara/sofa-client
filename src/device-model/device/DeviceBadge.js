import React from 'react';
import { Badge } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'

const DeviceBadge = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <Badge size={props.size}>{name}</Badge> 
    )
}

export default DeviceBadge;