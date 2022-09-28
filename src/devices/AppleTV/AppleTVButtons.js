import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext } from '@tabler/icons';
import usePlaybackState from 'endpoint-model/property/playbackState/useAlexaPlaybackState'
import usePlaybackController from 'endpoint-model/controller/PlaybackController/usePlaybackController'

export default function AppleTVButtons(props) {

    const { playbackState } = usePlaybackState(props.endpointId)
    const { play, pause, skip } = usePlaybackController(props.endpointId)

    const playPause = (event) => {
        if ( playbackState === 'PLAYING' ) {
            pause()
        } else {
            play()
        }
    }

    return ( 
        <Group position="apart" noWrap style={{width: "100%"}} onClick={ (event) => {event.stopPropagation();} }>
            <Group>
                <ActionIcon color="primary" variant="light" size="md" onClick={ (event) => playPause(event) } >
                    { playbackState === 'PLAYING' ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} /> }
                </ActionIcon>
                { props.playbackState!=='STOPPED' &&
                    <ActionIcon color="primary" variant="light" size="md" onClick={ skip} >
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                }
                </Group>
        </Group>
    );
}

