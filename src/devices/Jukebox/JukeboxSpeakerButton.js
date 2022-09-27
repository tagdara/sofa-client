import React from 'react';
import { Button, } from '@mantine/core'
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import { IconDeviceSpeaker } from '@tabler/icons';


const JukeboxSpeakerButton = props => {
    
    const excludeSpeakers = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const speakers = endpointIdsByDisplayCategory( "SPEAKER").filter(item => !excludeSpeakers.includes(item))
    const { onCount } = useMultiPower(speakers)

    return (
        <Button compact leftIcon={<IconDeviceSpeaker size={16} />} onClick={props.onClick}>
            {onCount}
        </Button>
    );
}

export default JukeboxSpeakerButton

