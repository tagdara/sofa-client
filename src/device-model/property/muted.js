import React from 'react';
import MutedSwitch from 'device-model/property/muted/MutedSwitch';
import MutedSegment from 'device-model/property/muted/MutedSegment';

const Muted = props => {

    if (props.compact) {
        return <MutedSegment {...props} />
    }

    return (    
        <MutedSwitch {...props} />
    )
}

export default Muted;