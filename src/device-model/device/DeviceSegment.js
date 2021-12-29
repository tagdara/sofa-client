import React from 'react';
import { Button } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import DeviceIcon from 'components/DeviceIcon'

const DeviceSegment = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <Button compact 
                radius="lg"
                style={{ 
                    paddingLeft: 12,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                }}
                leftIcon={<DeviceIcon size={12} endpointId={props.endpointId} />}
                variant="light" size={props.size ? props.size : "sm"}>{name}</Button> 
    )
}

export default DeviceSegment;