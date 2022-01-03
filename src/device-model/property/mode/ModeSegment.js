import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import Segment from 'components/Segment'

export default function ModeSegment(props) {

    const { modeLabel } = useMode(props.endpointId, props.instance, props.value, props.directive)

    return (
        <Segment value={ modeLabel } />
    );
}

