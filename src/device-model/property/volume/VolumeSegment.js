import React from 'react';
import useVolume from 'device-model/property/volume/useVolume'
import Segment from 'components/Segment'

export default function VolumeSegment(props) {

    const { volumeLabel } = useVolume(props.endpointId, props.value, props.directive)

    return <Segment value={volumeLabel} />
}

