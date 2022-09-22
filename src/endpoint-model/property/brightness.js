import React from 'react';
import BrightnessSlider from 'endpoint-model/property/brightness/BrightnessSlider'
import BrightnessSegment from 'endpoint-model/property/brightness/BrightnessSegment'

const Brightness = props => {

    if (props.compact) {
        return <BrightnessSegment {...props} />
    }

    return (    
        <BrightnessSlider {...props} />
    )
}

export default Brightness;