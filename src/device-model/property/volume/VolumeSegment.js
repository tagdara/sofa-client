import React from 'react';
import useVolume from 'device-model/property/volume/useVolume'
import SegmentPopover from 'components/SegmentPopover'
import VolumeSlider from 'device-model/property/volume/VolumeSlider'

export default function VolumeSegment(props) {

    const { volumeLabel } = useVolume(props.endpointId, props.value, props.directive)

    return <SegmentPopover minWidth={200} size={props.size} value={volumeLabel} popOver={<VolumeSlider step={1} {...props} />} />
}

