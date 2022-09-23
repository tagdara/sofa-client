import React from 'react';
import useMode from 'endpoint-model/property/rangeValue/useRangeValue'
import SegmentPopover from 'layout/components/SegmentPopover'
import RangeValueSlider from 'endpoint-model/property/rangeValue/RangeValueSlider'

export default function ModeSegment(props) {

    const { rangeValue } = useMode(props.endpointId, props.instance, props.value, props.directive)

    return (
        <SegmentPopover  width={300} size={props.size} value={ rangeValue } popOver={<RangeValueSlider {...props} />} />
    );

}

