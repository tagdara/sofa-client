import React from 'react';
import TemperatureAvatar from 'endpoint-model/property/temperature/TemperatureAvatar'
import TemperatureSegment from 'endpoint-model/property/temperature/TemperatureSegment'

const Temperature = props => {

    if (props.compact) {
        return <TemperatureSegment {...props} />
    }

    return (    
        <TemperatureAvatar {...props} />
    )
}

export default Temperature;