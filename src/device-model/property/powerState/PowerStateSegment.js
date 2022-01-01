import React from 'react';
import usePowerState from 'device-model/property/powerState/usePowerState'
import Segment from 'device-model/property/Segment'

export default function PowerStateSegment(props) {

    const { powerStateLabel } = usePowerState(props.endpointId, props.value, props.directive)

    return (
        <Segment>{ powerStateLabel }</Segment>
    );
}
