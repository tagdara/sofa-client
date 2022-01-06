import React from 'react';
import RangeValueSlider from 'device-model/property/rangeValue/RangeValueSlider'
import RangeValueSegment from 'device-model/property/rangeValue/RangeValueSegment'

const RangeValue = props => {

    if (props.compact) {
        return <RangeValueSegment {...props} />
    }

    return (    
        <RangeValueSlider {...props} />
    )
}

export default RangeValue;