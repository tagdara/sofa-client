import React from 'react';
import useMode from 'device-model/property/rangeValue/useRangeValue'
import SegmentPopover from 'components/SegmentPopover'
import RangeValueSlider from 'device-model/property/rangeValue/RangeValueSlider'

export default function ModeSegment(props) {

    const { rangeValue } = useMode(props.endpointId, props.instance, props.value, props.directive)

    return (
        <SegmentPopover  size={props.size} value={ rangeValue } popOver={<RangeValueSlider {...props} />} />
    );

}

