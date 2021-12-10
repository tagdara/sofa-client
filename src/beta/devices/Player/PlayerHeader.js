import React, { useEffect } from 'react';
import { Group } from '@mantine/core'

import PlayerArtOverlay from 'beta/devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'beta/devices/Player/PlayerArtOverlayButtons';
import PlaceholderCard from 'layout/PlaceholderCard';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'

const PlayerHeader = props => {
    
    const jukebox = 'jukebox'
    const jukeboxState = useDeviceStateStore( state => state.deviceStates[jukebox] )
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(jukebox, 'jukeboxhero')
        return function cleanup() {
            unregister(jukebox, 'jukeboxhero')
        };
    // eslint-disable-next-line 
    }, [])

    if (!jukeboxState) {
        return <PlaceholderCard count={ 3 } />
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (jukeboxState.MusicController.playbackState.value ==='PLAYING') {
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
            <PlayerArtOverlay   deviceState={jukeboxState} cover={openJukebox} setMini={props.toggleIdle} >
                <PlayerArtOverlayButtons    min={props.setMini} cover={props.toggleIdle} stop={handleStop} 
                                            playPause={handlePlayPause} skip={handleSkip} jukebox={true} toggleSpeakerFilter={ props.toggleSpeakers }
                                            playbackState={ jukeboxState.MusicController.playbackState.value ? jukeboxState.MusicController.playbackState.value : 'Unknown'} />
            </PlayerArtOverlay>
        </Group>
    );
}

export default PlayerHeader;

