import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { IconMusic, IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext, IconDeviceSpeaker } from '@tabler/icons';

export default function PlayerArtOverlayButtons(props) {

    function openJukebox() {
        window.open(props.url,'_jukebox');
    }

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
            <Group>
                { props.jukebox &&
                    <ActionIcon  size="sm" onClick={props.toggleSpeakerFilter}>
                        <IconDeviceSpeaker size={20} />
                    </ActionIcon>
                }
                { props.jukebox &&
                    <ActionIcon  size="sm" onClick={openJukebox}>
                        <IconMusic size={20} />
                    </ActionIcon>
                }
                </Group>
        </Group>
    );
}

