import React from 'react';
import TimeRangeSelect from 'device-model/property/time/TimeRangeSelect'
import TimeRangeSegment from 'device-model/property/time/TimeRangeSegment'

const Time = props => {

    if (props.compact) {
        return <TimeRangeSegment {...props} />
    }

    return (    
        <TimeRangeSelect {...props} />
    )
}

export default Time;