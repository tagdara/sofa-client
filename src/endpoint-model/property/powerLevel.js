import React from 'react';
import PowerLevelSlider from 'endpoint-model/property/powerLevel/PowerLevelSlider'
import PowerLevelSegment from 'endpoint-model/property/powerLevel/PowerLevelSegment'

const PowerLevel = props => {

    if (props.compact) {
        return <PowerLevelSegment {...props} />
    }

    return (    
        <PowerLevelSlider {...props} />
    )
}

export default PowerLevel;