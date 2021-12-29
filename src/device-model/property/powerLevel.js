import React from 'react';
import PowerLevelSlider from 'device-model/property/powerLevel/PowerLevelSlider'
import PowerLevelSegment from 'device-model/property/powerLevel/PowerLevelSegment'

const PowerLevel = props => {

    if (props.compact) {
        return <PowerLevelSegment {...props} />
    }

    return (    
        <PowerLevelSlider {...props} />
    )
}

export default PowerLevel;