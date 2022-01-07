import React from 'react';
import useMuted from 'device-model/property/muted/useMuted'
import Segment from 'components/Segment'

export default function MutedSegment(props) {

    const { mutedLabel } = useMuted(props.endpointId, props.value, props.directive)

    return (
        <Segment>{ mutedLabel }</Segment>
    );
}

