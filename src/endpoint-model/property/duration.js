import React from 'react';
import DurationSegment from 'endpoint-model/property/duration/DurationSegment';

const Duration = props => {

    if (props.compact) {
        return <DurationSegment {...props} />
    }

    return (    
        <DurationSegment {...props} />
    )
}

export default Duration;