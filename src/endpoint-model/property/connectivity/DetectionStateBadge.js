import React from 'react';
import { Badge } from '@mantine/core';
import useDetectionState from 'endpoint-model/property/detectionState/useDetectionState'

const DetectionStateBadge = props => {

    const { detectionStateLabel } = useDetectionState(props.endpointId, props.value, props.directive)

    return (
        <Badge>{detectionStateLabel}</Badge>
    )
}

export default DetectionStateBadge;