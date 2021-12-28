import React from 'react';
import DetectionStateSelect from 'device-model/property/detectionState/DetectionStateSelect';
import DetectionStateBadge from 'device-model/property/detectionState/DetectionStateBadge';

const DetectionState = props => {

    if (props.compact) {
        return <DetectionStateBadge {...props} />
    }

    return (    
        <DetectionStateSelect {...props} />
    )
}

export default DetectionState;