import React from 'react';
import InputSelect from 'device-model/property/input/InputSelect'
import InputSegment from 'device-model/property/input/InputSegment'

const Input = props => {

    if (props.compact ) {
        return <InputSegment {...props} />
    }

    return (    
        <InputSelect {...props} />
    )
}

export default Input;