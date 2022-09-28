import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext } from '@tabler/icons';
//import usePlaybackController from 'endpoint-model/controller/PlaybackController/usePlaybackController'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import { directive } from 'endpoint-model/directive/directive'

export default function PlayerButtons(props) {

    // Careful as there is a sofa playback state and controller controller and an alexa one and they need to be sorted out
    // Compare AppleTV, Sonos, and Jukebox and come to one spec

    //const { play, pause, skip } = usePlaybackController(props.endpointId)
    const { playbackState } = usePlaybackState(props.endpointId)

    const playPause = (event) => {
        if ( playbackState === 'PLAYING' ) {
            //pause()
            directive(props.endpointId, 'Sofa.MusicController', 'Pause')
        } else {
            //play()
            directive(props.endpointId, 'Sofa.MusicController', 'Play')
        }
    }

    const sofaSkip = () => {
        directive(props.endpointId, 'Sofa.MusicController', "Skip")
    }


    return ( 
        <Group position="apart" noWrap style={{width: "100%"}} onClick={ (event) => {event.stopPropagation();} }>
            <Group>
                <ActionIcon color="primary" variant="light" size="md" onClick={playPause}>
                    { playbackState==='PLAYING' ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} /> }
                </ActionIcon>
                { playbackState !== 'STOPPED' &&
                    <ActionIcon color="primary" variant="light" size="md" onClick={sofaSkip}>
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                }
                </Group>
                { props.children }
        </Group>
    );
}

