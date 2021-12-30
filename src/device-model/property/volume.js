import React from 'react';
import VolumeSlider from 'device-model/property/volume/VolumeSlider'
import VolumeSegment from 'device-model/property/volume/VolumeSegment'

const Volume = props => {

    if (props.compact) {
        return <VolumeSegment {...props} />
    }

    return (    
        <VolumeSlider {...props} />
    )
}

export default Volume;