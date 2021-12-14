import React, { useEffect } from 'react';
import { ActionIcon, Avatar, Group, Text } from '@mantine/core'
import { Speaker as SpeakerIcon, Music } from 'react-feather'
import PlaceholderCard from 'beta/layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'

const PlayerHeaderSmall = props => {
    
    const serverurl="https://"+window.location.hostname;
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

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <Group direction="row" noWrap position="apart" onClick={props.toggleIdle}>
            <Group>
                <Avatar size="lg" src={ jukeboxState.MusicController.art.value ? 
                                serverurl + jukeboxState.MusicController.art.value :
                                'X' } 
                />
                <Text>{'Jukebox is idle'}</Text>
            </Group>
            <Group>
                <ActionIcon size={"small"} onClick={props.toggleSpeakers}>
                    <SpeakerIcon size={20} />
                </ActionIcon>
                <ActionIcon size={"small"} onClick={openJukebox}>
                    <Music size={20} />
                </ActionIcon>
            </Group>
        </Group>    
    );
}

export default PlayerHeaderSmall;