import React from 'react';
import useMode from 'device-model/property/rangeValue/useRangeValue'
import Segment from 'components/Segment'

export default function ModeSegment(props) {

    const { rangeValue } = useMode(props.endpointId, props.instance, props.value, props.directive)

    return (
        <Segment value={ rangeValue } />
    );
}

