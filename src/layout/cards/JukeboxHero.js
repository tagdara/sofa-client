import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SpeakerIcon from '@mui/icons-material/Speaker';

import ItemBase from 'components/ItemBase';
import PlayerArtOverlay from 'devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'devices/Player/PlayerArtOverlayButtons';
import PlaceholderCard from 'layout/PlaceholderCard';

import SpeakerList from 'devices/Speaker/SpeakerList';
import Spacer from 'components/Spacer';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import ColorAvatar from 'components/ColorAvatar'

const JukeboxHero = props => {
    
    const [showIdle, setShowIdle]=useState(false)
    const serverurl="https://"+window.location.hostname;
    const [ filterOff, setFilterOff] = useState(true)
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

    function handleCover() {
        setShowIdle(!showIdle)
    }

    function toggleSpeakerFilter() {
        setFilterOff(!filterOff)
        setShowIdle(true)
    }

    function isIdle() {
        try {
            return ['IDLE','STOPPED'].includes(jukeboxState.MusicController.playbackState.value)
        }
        catch {
            return true
        }
    }

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <ItemBase>
            { (isIdle() && !showIdle) ?
                <CardLine onClick={() => setShowIdle(true)}>
                    <ColorAvatar>{ jukeboxState.MusicController.art.value ? 
                                    <img height={64} width={64} src={serverurl + jukeboxState.MusicController.art.value} alt={"idle"} />
                                    : 'X' } 
                    </ColorAvatar>
                    <CardLineText primary={'Jukebox is idle'} />
                    <IconButton size={"small"} onClick={toggleSpeakerFilter}>
                        <SpeakerIcon />
                    </IconButton>
                    <Spacer width={8} />
                    <IconButton size={"small"} onClick={openJukebox}>
                        <QueueMusicIcon />
                    </IconButton>
                </CardLine>    
            :
                <CardLine>
                    <PlayerArtOverlay   deviceState={jukeboxState} cover={openJukebox} setMini={() => setShowIdle(false)} >
                        <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} 
                                                    playPause={handlePlayPause} skip={handleSkip} jukebox={true} toggleSpeakerFilter={ toggleSpeakerFilter }
                                                    playbackState={ jukeboxState.MusicController.playbackState.value ? jukeboxState.MusicController.playbackState.value : 'Unknown'} />
                    </PlayerArtOverlay>
                </CardLine>
            }
            <SpeakerList filterOff={filterOff} />

        </ ItemBase >
    );
}

export default JukeboxHero;

