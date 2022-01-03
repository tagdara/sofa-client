import React from 'react';
import ModeSelect from 'device-model/property/mode/ModeSelect'
import ModeSegment from 'device-model/property/mode/ModeSegment'

const Mode = props => {

    if (props.compact) {
        console.log('compact mode props', props)
        return <ModeSegment {...props} />
    }

    return (    
        <ModeSelect {...props} />
    )
}

export default Mode;