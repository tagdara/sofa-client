import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconMusic, IconPlaylist, IconDeviceSpeaker } from '@tabler/icons';
import CardLine from 'components/CardLine'

const PlayerHeaderSmall = props => {
    
    function openJukebox() {
        var safariWindow = window.open();
        safariWindow.location.href = props.url
    }

    return (
        <CardLine   
            onClick={ props.toggleIdle }
            icon={ <IconPlaylist size={24} /> }
            primary={ 'Jukebox' }
        >
            <Group spacing={"xs"}>
                <ActionIcon variant="light" size="lg" onClick={props.toggleSpeakers}>
                    <IconDeviceSpeaker size={20} />
                </ActionIcon>
                <ActionIcon variant="light" size="lg" onClick={openJukebox}>
                    <IconMusic size={20} />
                </ActionIcon>
            </Group>
        </CardLine>  
    );
}

export default PlayerHeaderSmall;