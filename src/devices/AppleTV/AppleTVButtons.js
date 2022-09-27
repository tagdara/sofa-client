import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext } from '@tabler/icons';
import usePlaybackState from 'endpoint-model/property/playbackState/useAlexaPlaybackState'
import usePlaybackController from 'endpoint-model/controller/PlaybackController/usePlaybackController'

export default function AppleTVButtons(props) {

    const { playbackState } = usePlaybackState(props.endpointId)
    const { play, pause, skip } = usePlaybackController(props.endpointId)

    const playPause = (event) => {
        event.stopPropagation();
        if ( playbackState === 'PLAYING' ) {
            pause()
        } else {
            play()
        }
    }

    return ( 
        <Group position="apart" noWrap style={{width: "100%"}}>
            <Group>
                <ActionIcon  size="sm" onClick={ (event) => playPause(event) } >
                    { playbackState === 'PLAYING' ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} /> }
                </ActionIcon>
                { props.playbackState!=='STOPPED' &&
                    <ActionIcon size="sm" onClick={ skip} >
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                }
                </Group>
        </Group>
    );
}

