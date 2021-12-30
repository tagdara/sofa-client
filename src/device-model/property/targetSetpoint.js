import React from 'react';
import TargetSetpointAdjuster from 'device-model/property/targetSetpoint/TargetSetpointAdjuster'
import TargetSetpointSegment from 'device-model/property/targetSetpoint/TargetSetpointSegment'

const TargetSetpoint = props => {

    if (props.compact) {
        return <TargetSetpointSegment {...props} />
    }

    return (    
        <TargetSetpointAdjuster {...props} />
    )
}

export default TargetSetpoint;