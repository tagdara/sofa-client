import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext } from '@tabler/icons';
import usePlaybackController from 'endpoint-model/controller/PlaybackController/usePlaybackController'
import usePlaybackStateReporter from 'endpoint-model/controller/PlaybackStateReporter/usePlaybackStateReporter'

export default function AppleTVButtons(props) {

    const { isPlaying, isStopped } = usePlaybackStateReporter(props.endpointId)
    const { play, pause, skip } = usePlaybackController(props.endpointId)

    return ( 
        <Group position="apart" noWrap style={{width: "100%"}} onClick={ (event) => {event.stopPropagation();} }>
            <Group>
                <ActionIcon color="primary" variant="light" size="md" onClick={ isPlaying ? pause : play } >
                    { isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} /> }
                </ActionIcon>
                { !isStopped &&
                    <ActionIcon color="primary" variant="light" size="md" onClick={ skip} >
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                }
                </Group>
        </Group>
    );
}

