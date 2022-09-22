import React from 'react';
import ToggleStateSwitch from 'endpoint-model/property/toggleState/ToggleStateSwitch';
import ToggleStateSegment from 'endpoint-model/property/toggleState/ToggleStateSegment';

const ToggleState = props => {

    if (props.compact) {
        return <ToggleStateSegment {...props} />
    }

    return (    
        <ToggleStateSwitch {...props} />
    )
}

export default ToggleState;