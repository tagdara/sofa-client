import React from 'react';
import { Select } from '@mantine/core';
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'

const PlaybackStateSelect = props => {

    const { playbackState, selections, setPlaybackState } = usePlaybackState(props.endpointId, props.value, props.directive)
    const disabled = props.disabled 

    return (
        <Select size="sm" disabled={disabled} 
                placeholder={"PlaybackState"}
                onChange={ setPlaybackState } 
                value={ playbackState }
                data={ selections }
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default PlaybackStateSelect;