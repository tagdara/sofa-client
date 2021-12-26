import React from 'react';
import { ActionIcon, Avatar, Group, Text } from '@mantine/core'
import { Speaker as SpeakerIcon, Music } from 'react-feather'
import PlaceholderCard from 'layout/PlaceholderCard';
import { useRegister } from 'store/useRegister'

const PlayerHeaderSmall = props => {
    
    const serverurl="https://"+window.location.hostname;
    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState) {
        return <PlaceholderCard count={ 3 } />
    }

    function openJukebox() {
        var safariWindow = window.open();
        safariWindow.location.href = props.url
    }

    return (
        <Group direction="row" noWrap position="apart" onClick={props.toggleIdle}>
            <Group>
                <Avatar size="lg" src={ deviceState.MusicController.art.value ? 
                                serverurl + deviceState.MusicController.art.value :
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