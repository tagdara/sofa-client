import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import SegmentMenu from 'layout/components/SegmentMenu'

export default function ModeSegment(props) {

    const { modeLabel, selections, setMode} = useMode(props.endpointId, props.instance, props.value, props.directive)

    if (!selections || !selections.length) { return null }

    return (
        <SegmentMenu size={props.size} value={ modeLabel } selections={selections} select={setMode} />
    );
}

