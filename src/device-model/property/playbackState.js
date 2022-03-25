import React from 'react';
import PlaybackStateSelect from 'device-model/property/playbackState/PlaybackStateSelect'
import PlaybackStateSegment from 'device-model/property/playbackState/PlaybackStateSegment'

const PlaybackState = props => {

    if (props.compact ) {
        return <PlaybackStateSegment {...props} />
    }

    return (    
        <PlaybackStateSelect {...props} />
    )
}

export default PlaybackState;