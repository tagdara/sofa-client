import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { MusicNoteList, Speaker as SpeakerIcon, MusicNoteBeamed as Music } from 'react-bootstrap-icons'
import PlaceholderCard from 'layout/PlaceholderCard';
import { useRegister } from 'store/useRegister'
//import useTokenImage from 'helpers/useTokenImage'
import CardLine from 'components/CardLine'

const PlayerHeaderSmall = props => {
    
    const { deviceState } = useRegister(props.endpointId)
    // const data = deviceState && deviceState.MusicController ? deviceState.MusicController : {}
    // const art = (data.art && data.art.value) ? data.art.value : ""
    // const { localImageUrl } = useTokenImage(art)

    if (!deviceState) {
        return <PlaceholderCard count={ 3 } />
    }

    function openJukebox() {
        var safariWindow = window.open();
        safariWindow.location.href = props.url
    }

    //<Avatar size="lg" src={localImageUrl} />

    return (
            <CardLine   
                onClick={ props.toggleIdle }
                icon={ <MusicNoteList size={24} /> }
                primary={ 'Jukebox' }
            >
                <Group spacing={"xs"}>
                    <ActionIcon variant="light" size="lg" onClick={props.toggleSpeakers}>
                        <SpeakerIcon size={20} />
                    </ActionIcon>
                    <ActionIcon variant="light" size="lg" onClick={openJukebox}>
                        <Music size={20} />
                    </ActionIcon>
                </Group>
            </CardLine>  
    );
}

export default PlayerHeaderSmall;