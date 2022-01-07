import React from 'react';
import SegmentMenu from 'components/SegmentMenu'
import useDetectionState from 'device-model/property/detectionState/useDetectionState'

const DetectionStateSegment = props => {

    const { detectionStateLabel, selections, setDetectionState } = useDetectionState(props.endpointId, props.value, props.directive)

    return <SegmentMenu value={detectionStateLabel} selections={selections} select={setDetectionState} />

}

export default DetectionStateSegment