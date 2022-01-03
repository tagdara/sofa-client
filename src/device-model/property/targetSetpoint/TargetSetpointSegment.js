import React from 'react';
import Segment from 'components/Segment'
import useTargetSetpoint from 'device-model/property/targetSetpoint/useTargetSetpoint'

const TargetSetpointSegment = props => {

    const { targetSetpointLabel } = useTargetSetpoint(props.endpointId, props.value, props.directive)

    return <Segment value={ targetSetpointLabel}/>

}

export default TargetSetpointSegment

