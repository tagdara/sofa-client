import React from 'react';
import SegmentPopover from 'components/SegmentPopover'
import useTargetSetpoint from 'device-model/property/targetSetpoint/useTargetSetpoint'
import TargetSetpointAdjuster from 'device-model/property/targetSetpoint/TargetSetpointAdjuster'

const TargetSetpointSegment = props => {

    const { targetSetpointLabel } = useTargetSetpoint(props.endpointId, props.value, props.directive)

    return <SegmentPopover size={props.size} value={ targetSetpointLabel} popOver={<TargetSetpointAdjuster {...props} />} />

}

export default TargetSetpointSegment

