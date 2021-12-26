import React from 'react';
import { Group } from '@mantine/core'
import PlayerArtOverlay from 'devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'devices/Player/PlayerArtOverlayButtons';
import PlaceholderCard from 'layout/PlaceholderCard';
import { directive } from 'store/directive'
import { useRegister } from 'store/useRegister'

const PlayerHeader = props => {
    
    const jukebox = 'jukebox'
    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState) {
        return <PlaceholderCard count={ 3 } />
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (deviceState.MusicController.playbackState.value ==='PLAYING') {
            directive(jukebox, 'MusicController', 'Pause')
        } else {
            directive(jukebox, 'MusicController', 'Play')
        }
    }; 

    function handleSkip(event) {
        directive(jukebox, 'MusicController', "Skip")
    }; 

    function handleStop(event) {
        directive(jukebox, 'MusicController', "Stop")
    }; 

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <Group direction="row">
            <PlayerArtOverlay   deviceState={deviceState} cover={openJukebox} setMini={props.toggleIdle} >
                <PlayerArtOverlayButtons    min={props.setMini} cover={props.toggleIdle} stop={handleStop} url={props.url}
                                            playPause={handlePlayPause} skip={handleSkip} jukebox={true} toggleSpeakerFilter={ props.toggleSpeakers }
                                            playbackState={ deviceState.MusicController.playbackState.value ? deviceState.MusicController.playbackState.value : 'Unknown'} />
            </PlayerArtOverlay>
        </Group>
    );
}

export default PlayerHeader;

