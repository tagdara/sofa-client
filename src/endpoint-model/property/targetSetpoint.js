import React from 'react';
import TargetSetpointAdjuster from 'endpoint-model/property/targetSetpoint/TargetSetpointAdjuster'
import TargetSetpointSegment from 'endpoint-model/property/targetSetpoint/TargetSetpointSegment'

const TargetSetpoint = props => {

    if (props.compact) {
        return <TargetSetpointSegment {...props} />
    }

    return (    
        <TargetSetpointAdjuster {...props} />
    )
}

export default TargetSetpoint;