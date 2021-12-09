import React, { useState, useEffect } from 'react';
import { ActionIcon, Avatar, Card, Group, Space, Text } from '@mantine/core'
import { Speaker as SpeakerIcon, Music } from 'react-feather'

import PlayerArtOverlay from 'beta/devices/Player/PlayerArtOverlay';
import PlayerArtOverlayButtons from 'beta/devices/Player/PlayerArtOverlayButtons';
import PlaceholderCard from 'layout/PlaceholderCard';

import SpeakerList from 'beta/devices/Speaker/SpeakerList';
import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'

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
        <Card padding="sm" radius="md">
            <Group direction="column" noWrap grow>
            { (isIdle() && !showIdle) ?
                <Group direction="row" onClick={() => setShowIdle(true)}>
                    <Avatar src={ jukeboxState.MusicController.art.value ? 
                                    serverurl + jukeboxState.MusicController.art.value :
                                    'X' } 
                    />
                    <Text primary={'Jukebox is idle'} />
                    <ActionIcon size={"small"} onClick={toggleSpeakerFilter}>
                        <SpeakerIcon size={20} />
                    </ActionIcon>
                    <Space width={8} />
                    <ActionIcon size={"small"} onClick={openJukebox}>
                        <Music size={20} />
                    </ActionIcon>
                </Group>    
            :
                <Group direction="row">
                    <PlayerArtOverlay   deviceState={jukeboxState} cover={openJukebox} setMini={() => setShowIdle(false)} >
                        <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} 
                                                    playPause={handlePlayPause} skip={handleSkip} jukebox={true} toggleSpeakerFilter={ toggleSpeakerFilter }
                                                    playbackState={ jukeboxState.MusicController.playbackState.value ? jukeboxState.MusicController.playbackState.value : 'Unknown'} />
                    </PlayerArtOverlay>
                </Group>
            }
            <SpeakerList filterOff={filterOff} />
            </Group>
        </Card >
    );
}

export default JukeboxHero;

