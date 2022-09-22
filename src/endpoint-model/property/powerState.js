import React from 'react';
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch';
import PowerStateSegment from 'endpoint-model/property/powerState/PowerStateSegment';

const PowerState = props => {

    if (props.compact) {
        return <PowerStateSegment {...props} />
    }

    return (    
        <PowerStateSwitch {...props} />
    )
}

export default PowerState;