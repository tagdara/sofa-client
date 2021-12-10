import React from 'react';
import { ActionIcon, Group } from '@mantine/core'
import { List, Pause, Play, SkipForward, Speaker as SpeakerIcon, Music } from 'react-feather'

export default function PlayerArtOverlayButtons(props) {

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        window.open(newurl,'_jukebox');
    }
    
    return ( 
        <Group direction="row" position="apart" noWrap style={{width: "100%"}}>
            <Group>
                <ActionIcon  size="sm" onClick={ (e) => props.playPause(e)}>
                    { props.playbackState==='PLAYING' ? <Pause size={20} /> : <Play size={20} /> }
                </ActionIcon>
                { props.playbackState!=='STOPPED' &&
                    <ActionIcon size="sm" onClick={ (e) => props.skip(e)}>
                        <SkipForward size={20} />
                    </ActionIcon>
                }
                </Group>
            <Group>
                { props.jukebox &&
                    <ActionIcon  size="sm" onClick={props.toggleSpeakerFilter}>
                        <SpeakerIcon size={20} />
                    </ActionIcon>
                }
                { props.jukebox &&
                    <ActionIcon  size="sm" onClick={openJukebox}>
                        <Music size={20} />
                    </ActionIcon>
                }
                { props.players &&
                <ActionIcon  size="sm" onClick={ (e) => props.players(e)}>
                    <List size={20} />
                </ActionIcon>
                }
                </Group>
        </Group>
    );
}

