import React from 'react';
import { Group, Stack } from '@mantine/core'
import PlayerArtOverlay from 'devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'devices/Player/PlayerArtOverlayButtons';
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
                <PlayerArtOverlay   
                    endpointId={props.endpointId}
                >
                    <PlayerArtOverlayButtons    
                        stop={handleStop} 
                        url={props.url}
                        playPause={handlePlayPause}
                        skip={handleSkip}
                        playbackState={ playbackState } />
                </PlayerArtOverlay>
            </Group>
            <Speaker endpointId={props.endpointId} on={true} volumeMarks={marks} noVolumeMarkLabels={true} />
        </Stack>
    );
}

export default SonosCard;
