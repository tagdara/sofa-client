import React from 'react';
import Segment from 'device-model/property/Segment'
import useTargetSetpoint from 'device-model/property/targetSetpoint/useTargetSetpoint'

const TargetSetpointSegment = props => {

    const { targetSetpointLabel } = useTargetSetpoint(props.endpointId, props.value, props.directive)

    return <Segment value={ targetSetpointLabel}/>

}

export default TargetSetpointSegment

