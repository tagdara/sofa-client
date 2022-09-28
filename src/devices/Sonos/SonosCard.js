import React from 'react';
import { Group, Stack } from '@mantine/core'
import PlayerArt from 'devices/Player/PlayerArt';
import PlayerButtons from 'devices/Player/PlayerButtons';
import PlayerMediaInfo from 'devices/Player/PlayerMediaInfo';
import Speaker from 'devices/Speaker/Speaker.js'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import { directive } from 'endpoint-model/directive/directive'

const SonosCard = props => {
    
    const { playbackState } = usePlaybackState(props.endpointId)

    const volumePresets = [1, 2, 5, 10];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    function handlePlayPause(event) {
        if (playbackState ==='PLAYING') {
            directive(props.endpointId, 'Sofa.MusicController', 'Pause')
        } else {
            directive(props.endpointId, 'Sofa.MusicController', 'Play')
        }
    }; 

    function handleSkip() {
        directive(props.endpointId, 'Sofa.MusicController', "Skip")
    }; 

    function handleStop() {
        directive(props.endpointId, 'Sofa.MusicController', "Stop")
    }; 

    return (
        <Stack>
            <Group>
                <PlayerArt endpointId={props.endpointId} />
                <Stack>
                    <PlayerMediaInfo endpointId={props.endpointId} />
                    <PlayerButtons 
                        endpointId={props.endpointId} 
                        stop={handleStop} 
                        url={props.url}
                        playPause={handlePlayPause}
                        skip={handleSkip}
                        playbackState={ playbackState }                       
                    />
                </Stack>
            </Group>
            <Speaker endpointId={props.endpointId} on={true} volumeMarks={marks} noVolumeMarkLabels={true} />
        </Stack>
    );
}

export default SonosCard;

