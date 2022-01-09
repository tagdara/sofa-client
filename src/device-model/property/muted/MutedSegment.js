import React from 'react';
import useMuted from 'device-model/property/muted/useMuted'
import Segment from 'components/Segment'
import { VolumeX, Volume2 } from 'react-feather'

export default function MutedSegment(props) {

    const { muted, mutedLabel, toggle } = useMuted(props.endpointId, props.value, props.directive)
    
    const muteIcon = muted ? <VolumeX size={20} /> : <Volume2 size={20} /> 

    return (
        <Segment color={ (props.icon && !props.color && muted ) ? 'red' : undefined } onClick={toggle} >{ props.icon ? muteIcon : mutedLabel }</Segment>
    );
}

