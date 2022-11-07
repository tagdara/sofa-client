import React from 'react';
import useVolume from 'endpoint-model/property/volume/useVolume'
import SegmentPopover from 'layout/components/SegmentPopover'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'

export default function VolumeSegment(props) {

    const { volumeLabel } = useVolume(props.endpointId, props.value, props.directive)

    return <SegmentPopover position={props.position} width={300} size={props.size} value={ (props.prefix || "")+volumeLabel+(props.suffix|| "")} popOver={<VolumeSlider step={1} {...props} />} />
}

