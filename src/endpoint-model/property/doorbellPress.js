import React from 'react';
import DoorbellPressButton  from 'endpoint-model/property/doorbellPress/DoorbellPressButton';
import DoorbellPressSegment from 'endpoint-model/property/doorbellPress/DoorbellPressSegment';

const DoorbellPress = props => {

    if (props.compact) {
        return <DoorbellPressSegment {...props} />
    }

    return (    
        <DoorbellPressButton {...props} />
    )
}

export default DoorbellPress;