import React from 'react';
import RangeValueSlider from 'endpoint-model/property/rangeValue/RangeValueSlider'
import RangeValueSegment from 'endpoint-model/property/rangeValue/RangeValueSegment'

const RangeValue = props => {

    if (props.compact) {
        return <RangeValueSegment {...props} />
    }

    return (    
        <RangeValueSlider {...props} />
    )
}

export default RangeValue;