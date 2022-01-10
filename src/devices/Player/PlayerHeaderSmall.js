import React from 'react';
import { ActionIcon, Avatar, Group, Text } from '@mantine/core'
import { Speaker as SpeakerIcon, Music } from 'react-feather'
import PlaceholderCard from 'layout/PlaceholderCard';
import { useRegister } from 'store/useRegister'
import useTokenImage from 'helpers/useTokenImage'

const PlayerHeaderSmall = props => {
    
    const { deviceState } = useRegister(props.endpointId)
    const data = deviceState && deviceState.MusicController ? deviceState.MusicController : {}
    const art = (data.art && data.art.value) ? data.art.value : ""
    const { localImageUrl } = useTokenImage(art)

    if (!deviceState) {
        return <PlaceholderCard count={ 3 } />
    }

    function openJukebox() {
        var safariWindow = window.open();
        safariWindow.location.href = props.url
    }

    //                <Avatar size="lg" src={ deviceState.MusicController.art.value ? 
    //serverurl + deviceState.MusicController.art.value :
    //'X' } 
    // />

    return (
        <Group direction="row" noWrap position="apart" onClick={props.toggleIdle}>
            <Group>
                <Avatar size="lg" src={localImageUrl} />
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