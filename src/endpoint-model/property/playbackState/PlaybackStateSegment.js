import React from 'react';
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import SegmentMenu from 'components/SegmentMenu'

export default function PlaybackStateSegment(props) {

    const { playbackStateLabel, selections, setPlaybackState} = usePlaybackState(props.endpointId, props.value, props.directive)

    return (
        <SegmentMenu size={props.size} value={playbackStateLabel} selections={selections} select={setPlaybackState} />
    );
}

