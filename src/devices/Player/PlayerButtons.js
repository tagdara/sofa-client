import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext } from '@tabler/icons';
import usePlaybackStateReporter from 'endpoint-model/controller/PlaybackStateReporter/usePlaybackStateReporter'
import usePlaybackController from 'endpoint-model/controller/PlaybackController/usePlaybackController'

export default function PlayerButtons(props) {

    const { play, pause, skip } = usePlaybackController(props.endpointId)
    const { isPlaying, isStopped } = usePlaybackStateReporter(props.endpointId)

    return ( 
        <Group position="apart" noWrap style={{width: "100%"}} onClick={ (event) => {event.stopPropagation();} }>
            <Group>
                <ActionIcon color="primary" variant="light" size="lg" onClick={isPlaying ? pause : play }>
                    { isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} /> }
                </ActionIcon>
                { !isStopped &&
                    <ActionIcon color="primary" variant="light" size="lg" onClick={skip}>
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                }
            </Group>
            { props.children }
        </Group>
    );
}

