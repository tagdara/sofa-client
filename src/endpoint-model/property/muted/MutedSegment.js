import React from 'react';
import useMuted from 'endpoint-model/property/muted/useMuted'
import Segment from 'layout/components/Segment'
import { IconVolume2, IconVolume3 } from '@tabler/icons';

export default function MutedSegment(props) {

    const { muted, mutedLabel, toggle } = useMuted(props.endpointId, props.value, props.directive)
    
    const muteIcon = muted ? <IconVolume3 size={16} /> : <IconVolume2 size={16} /> 

    return (
        <Segment 
            position={props.position} 
            size={props.size} 
            color={ 
                (props.icon && !props.color && muted ) ? 'red' : undefined 
            } 
            onClick={toggle} 
        >
            { props.icon ? muteIcon : mutedLabel }
        </Segment>
    );
}

