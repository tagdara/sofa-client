import React from 'react';
import Segment from 'components/Segment'
import useDetectionState from 'device-model/property/detectionState/useDetectionState'

const DetectionStateSegment = props => {

    const { detectionStateLabel } = useDetectionState(props.endpointId, props.value, props.directive)

    return <Segment value={detectionStateLabel} />
}

export default DetectionStateSegment;