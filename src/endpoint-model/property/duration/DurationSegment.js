import React from 'react';
import useDuration from "endpoint-model/property/duration/useDuration"
import SegmentPopover from 'layout/components/SegmentPopover'
import DurationInput from 'endpoint-model/property/duration/DurationInput'

export default function DurationSegment(props) {

    const { durationLabel } = useDuration(props.endpointId, props.value, props.directive)

    return (
        <SegmentPopover  width={200} size={props.size} value={ durationLabel } popOver={<DurationInput {...props} />} />
    );

}

