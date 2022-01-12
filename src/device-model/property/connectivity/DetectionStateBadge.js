import React from 'react';
import { Badge } from '@mantine/core';
import useDetectionState from 'device-model/property/detectionState/useDetectionState'

const DetectionStateBadge = props => {

    const { detectionStateLabel } = useDetectionState(props.endpointId, props.value, props.directive)

    return (
        <Badge>{detectionStateLabel}</Badge>
    )
}

export default DetectionStateBadge;