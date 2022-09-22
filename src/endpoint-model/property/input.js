import React from 'react';
import InputSelect from 'endpoint-model/property/input/InputSelect'
import InputSegment from 'endpoint-model/property/input/InputSegment'

const Input = props => {

    if (props.compact ) {
        return <InputSegment {...props} />
    }

    return (    
        <InputSelect {...props} />
    )
}

export default Input;