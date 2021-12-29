import React from 'react';
import BrightnessSlider from 'device-model/property/brightness/BrightnessSlider'
import BrightnessSegment from 'device-model/property/brightness/BrightnessSegment'

const Brightness = props => {

    if (props.compact) {
        return <BrightnessSegment {...props} />
    }

    return (    
        <BrightnessSlider {...props} />
    )
}

export default Brightness;