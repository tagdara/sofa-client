import React from 'react';
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import VolumeSegment from 'endpoint-model/property/volume/VolumeSegment'

const Volume = props => {

    if (props.compact) {
        return <VolumeSegment {...props} />
    }

    return (    
        <VolumeSlider {...props} />
    )
}

export default Volume;