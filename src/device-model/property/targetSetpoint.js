import React from 'react';
import TargetSetpointAdjuster from 'device-model/property/targetSetpoint/TargetSetpointAdjuster'

const TargetSetpoint = props => {

    return (    
        <TargetSetpointAdjuster {...props} />
    )
}

export default TargetSetpoint;