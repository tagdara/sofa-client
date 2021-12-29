import React from 'react';
import DetectionStateSelect from 'device-model/property/detectionState/DetectionStateSelect';
import DetectionStateSegment from 'device-model/property/detectionState/DetectionStateSegment';

const DetectionState = props => {

    if (props.compact) {
        return <DetectionStateSegment {...props} />
    }

    return (    
        <DetectionStateSelect {...props} />
    )
}

export default DetectionState;