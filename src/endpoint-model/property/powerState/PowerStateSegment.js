import React from 'react';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import SegmentMenu from 'layout/components/SegmentMenu'

export default function PowerStateSegment(props) {

    const { powerStateLabel, selections, selectPowerState} = usePowerState(props.endpointId, props.value, props.directive)

    return (
        <SegmentMenu color={props.color} size={props.size} value={ props.label ? props.label : powerStateLabel } selections={selections} select={selectPowerState} />
    );
}

