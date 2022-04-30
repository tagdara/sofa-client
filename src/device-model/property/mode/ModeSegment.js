import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import SegmentMenu from 'components/SegmentMenu'

export default function ModeSegment(props) {

    const { modeLabel, selections, setMode} = useMode(props.endpointId, props.instance, props.value, props.directive)
    
    return (
        <SegmentMenu size={props.size} value={ modeLabel } selections={selections} select={setMode} />
    );
}

