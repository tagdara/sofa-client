import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext } from '@tabler/icons';
import JukeboxSpeakerButton from 'devices/Player/JukeboxSpeakerButton'

export default function PlayerArtOverlayButtons(props) {

    return ( 
        <Group position="apart" noWrap style={{width: "100%"}}>
            <Group>
                <ActionIcon  size="sm" onClick={ (e) => props.playPause(e)}>
                    { props.playbackState==='PLAYING' ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} /> }
                </ActionIcon>
                { props.playbackState!=='STOPPED' &&
                    <ActionIcon size="sm" onClick={ (e) => props.skip(e)}>
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                }
                </Group>
                { props.jukebox && <JukeboxSpeakerButton onClick={props.showOverlay} /> }
        </Group>
    );
}

