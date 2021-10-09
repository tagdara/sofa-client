import React, { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpeakerIcon from '@material-ui/icons/Speaker';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import PlayerArtOverlay from 'devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'devices/Player/PlayerArtOverlayButtons';
import ItemBase from 'components/ItemBase';
import PlaceholderCard from 'layout/PlaceholderCard';
import SofaListItem from 'components/SofaListItem';
import SpeakerList from 'devices/Speaker/SpeakerList';
import Spacer from 'components/Spacer';


const JukeboxHero = React.memo(props => {
    
    const [showIdle, setShowIdle]=useState(false)
    const serverurl="https://"+window.location.hostname;
    const [ filterOff, setFilterOff] = useState(true)
    const jukebox = 'jukebox:player:jukebox'
    const jukeboxState = props.deviceState[jukebox]

    useEffect(() => {
        props.addEndpointIds('id','jukebox:player:jukebox','JukeboxHero')
    // eslint-disable-next-line 
    }, [])

    if (!jukeboxState) {
        return <PlaceholderCard count={ 3 } />
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (jukeboxState.MusicController.playbackState.value ==='PLAYING') {
            props.directive(jukebox, 'MusicController', 'Pause')
        } else {
            props.directive(jukebox, 'MusicController', 'Play')
        }
    }; 

    function handleSkip(event) {
        props.directive(jukebox, 'MusicController', "Skip")
    }; 

    function handleStop(event) {
        props.directive(jukebox, 'MusicController', "Stop")
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
                <SofaListItem   avatar={ jukeboxState.MusicController.art.value ? 
                                         <img height={64} width={64} src={serverurl + jukeboxState.MusicController.art.value} alt={"idle"} />
                                         : 'X' } 
                                avatarClick={() => setShowIdle(true)} 
                                avatarState={ 'off' }
                                primary={'Jukebox is idle'}
                                secondaryActions={
                                    <>
                                        <IconButton size={"small"} onClick={toggleSpeakerFilter}>
                                            <SpeakerIcon />
                                        </IconButton>
                                        <Spacer width={8} />
                                        <IconButton size={"small"} onClick={openJukebox}>
                                            <QueueMusicIcon />
                                        </IconButton>
                                    </>
                                }
                />            
            :
                    <PlayerArtOverlay   deviceState={jukeboxState} cover={openJukebox} setMini={() => setShowIdle(false)} >
                        <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} 
                                                    playPause={handlePlayPause} skip={handleSkip} jukebox={true} toggleSpeakerFilter={ toggleSpeakerFilter }
                                                    playbackState={ jukeboxState.MusicController.playbackState.value ? jukeboxState.MusicController.playbackState.value : 'Unknown'} />
                    </PlayerArtOverlay>
            }
            <SpeakerList filterOff={filterOff} />

        </ ItemBase >
    );
}, deviceStatesAreEqual);

export default dataFilter(JukeboxHero);

