import React from 'react';
import useToggleState from 'device-model/property/toggleState/useToggleState'
import SegmentMenu from 'components/SegmentMenu'

export default function ToggleStateSegment(props) {

    const { toggleState, toggleStateLabel, selections, selectToggleState} = useToggleState(props.endpointId, props.instance, props.value, props.directive)

    console.log('toggle', toggleStateLabel, toggleState)

    return (
        <SegmentMenu size={props.size} value={ toggleStateLabel } selections={selections} select={selectToggleState} />
    );
}

