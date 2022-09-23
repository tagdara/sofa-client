import React from 'react';
import SegmentMenu from 'layout/components/SegmentMenu'
import useDetectionState from 'endpoint-model/property/detectionState/useDetectionState'

const DetectionStateSegment = props => {

    const { detectionStateLabel, selections, setDetectionState } = useDetectionState(props.endpointId, props.value, props.directive)

    return <SegmentMenu value={detectionStateLabel} selections={selections} select={setDetectionState} />

}

export default DetectionStateSegment