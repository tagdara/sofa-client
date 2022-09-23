import React from 'react';
import useToggleState from 'endpoint-model/property/toggleState/useToggleState'
import SegmentMenu from 'layout/components/SegmentMenu'

export default function ToggleStateSegment(props) {

    const { toggleStateLabel, selections, selectToggleState} = useToggleState(props.endpointId, props.instance, props.value, props.directive)

    if (!toggleStateLabel) return null

    return (
        <SegmentMenu size={props.size} value={ toggleStateLabel } selections={selections} select={selectToggleState} />
    );
}

