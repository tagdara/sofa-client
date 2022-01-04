import React from 'react';
import useInput from 'device-model/property/input/useInput'
import Segment from 'components/Segment'

export default function InputSegment(props) {

    const { inputLabel } = useInput(props.endpointId, props.value, props.directive)

    return (
        <Segment value={ inputLabel } />
    );
}

