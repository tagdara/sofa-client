import React from 'react';
import { Group } from '@mantine/core'
import PlayerArtOverlay from 'devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'devices/Player/PlayerArtOverlayButtons';
import PlaceholderCard from 'layout/PlaceholderCard';
import { directive } from 'store/directive'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'

const PlayerHeader = props => {
    
    const jukebox = 'jukebox'
    const { playbackState } = usePlaybackState(props.endpointId)

    if (!playbackState) {
        return <PlaceholderCard count={ 3 } />
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (playbackState ==='PLAYING') {
            directive(jukebox, 'Sofa.MusicController', 'Pause')
        } else {
            directive(jukebox, 'Sofa.MusicController', 'Play')
        }
    }; 

    function handleSkip(event) {
        directive(jukebox, 'Sofa.MusicController', "Skip")
    }; 

    function handleStop(event) {
        directive(jukebox, 'Sofa.MusicController', "Stop")
    }; 

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <Group direction="row">
            <PlayerArtOverlay   
                endpointId={props.endpointId}
                cover={openJukebox} 
                setMini={props.toggleIdle}
            >
                <PlayerArtOverlayButtons    
                    min={props.setMini} 
                    cover={props.toggleIdle} 
                    stop={handleStop} 
                    url={props.url}
                    playPause={handlePlayPause}
                    skip={handleSkip}
                    jukebox={true} 
                    toggleSpeakerFilter={ props.toggleSpeakers }
                    playbackState={ playbackState } />
            </PlayerArtOverlay>
        </Group>
    );
}

export default PlayerHeader;

