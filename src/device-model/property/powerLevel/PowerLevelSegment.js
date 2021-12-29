import React from 'react';
import usePowerLevel from 'device-model/property/powerLevel/usePowerLevel'
import Segment from 'device-model/property/Segment'

export default function PowerLevelSegment(props) {

    const { powerLevelLabel } = usePowerLevel(props.endpointId, props.value, props.directive)

    return (
        <Segment>{ powerLevelLabel }</Segment>
    );
}

