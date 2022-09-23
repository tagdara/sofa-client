import React from 'react';
import useInput from 'endpoint-model/property/input/useInput'
import SegmentMenu from 'layout/components/SegmentMenu'

export default function InputSegment(props) {

    const { inputLabel, selections, selectInput} = useInput(props.endpointId, props.value, props.directive)

    return (
        <SegmentMenu size={props.size} value={inputLabel} selections={selections} select={selectInput} />
    );
}

