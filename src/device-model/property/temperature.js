import React from 'react';
import TemperatureAvatar from 'device-model/property/temperature/TemperatureAvatar'
import TemperatureSegment from 'device-model/property/temperature/TemperatureSegment'

const Temperature = props => {

    if (props.compact) {
        return <TemperatureSegment {...props} />
    }

    return (    
        <TemperatureAvatar {...props} />
    )
}

export default Temperature;