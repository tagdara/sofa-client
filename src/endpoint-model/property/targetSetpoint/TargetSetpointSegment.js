import React from 'react';
import SegmentPopover from 'components/SegmentPopover'
import useTargetSetpoint from 'endpoint-model/property/targetSetpoint/useTargetSetpoint'
import TargetSetpointAdjuster from 'endpoint-model/property/targetSetpoint/TargetSetpointAdjuster'

const TargetSetpointSegment = props => {

    const { targetSetpointLabel } = useTargetSetpoint(props.endpointId, props.value, props.directive)

    return <SegmentPopover width={200} size={props.size} value={ targetSetpointLabel} popOver={<TargetSetpointAdjuster {...props} />} />

}

export default TargetSetpointSegment

