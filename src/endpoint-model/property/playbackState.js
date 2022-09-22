import React from 'react';
import PlaybackStateSelect from 'endpoint-model/property/playbackState/PlaybackStateSelect'
import PlaybackStateSegment from 'endpoint-model/property/playbackState/PlaybackStateSegment'

const PlaybackState = props => {

    if (props.compact ) {
        return <PlaybackStateSegment {...props} />
    }

    return (    
        <PlaybackStateSelect {...props} />
    )
}

export default PlaybackState;