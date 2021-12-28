import React from 'react';
import DoorbellPressBadge  from 'device-model/property/doorbellPress/DoorbellPressBadge';
import DoorbellPressButton  from 'device-model/property/doorbellPress/DoorbellPressButton';

const PowerState = props => {

    if (props.compact) {
        return <DoorbellPressBadge {...props} />
    }

    return (    
        <DoorbellPressButton {...props} />
    )
}

export default PowerState;