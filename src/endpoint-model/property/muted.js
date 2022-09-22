import React from 'react';
import MutedSwitch from 'endpoint-model/property/muted/MutedSwitch';
import MutedSegment from 'endpoint-model/property/muted/MutedSegment';

const Muted = props => {

    if (props.compact) {
        return <MutedSegment {...props} />
    }

    return (    
        <MutedSwitch {...props} />
    )
}

export default Muted;