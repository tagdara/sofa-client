import React from 'react';
import usePowerState from 'device-model/property/powerState/usePowerState'
import SegmentMenu from 'components/SegmentMenu'

export default function PowerStateSegment(props) {

    const { powerStateLabel, selections, selectPowerState} = usePowerState(props.endpointId, props.value, props.directive)

    return (
        <SegmentMenu size={props.size} value={ powerStateLabel } selections={selections} select={selectPowerState} />
    );
}

