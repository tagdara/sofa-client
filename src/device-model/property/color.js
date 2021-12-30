import React from 'react';
import ColorButton from 'device-model/property/color/ColorButton'
import ColorSegment from 'device-model/property/color/ColorSegment'

const Color = props => {

    if (props.compact) {
        return <ColorSegment {...props} />
    }

    return (    
        <ColorButton {...props} />
    )
}

export default Color;