import React from 'react';
import { Group, Image, Text } from '@mantine/core'

export default function PlayerArtOverlay(props) {
    
    const serverurl="https://"+window.location.hostname;
    const data = props.deviceState && props.deviceState.MusicController ? props.deviceState.MusicController : {}
    var coverDefault = ""
    const art = data.art ? data.art.value : coverDefault
    const title = data.title ? data.title.value : "Jukebox is idle"
    const artist = data.artist ? data.artist.value : ""
    const artUrl = art.startsWith('http') ? art : serverurl + art + "?title="+title

    return ( 
            <Group direction="row" noWrap>
                <Image 
                    radius="sm"
                    style={{ minWidth: "30%", maxWidth: "40%", width: "40%" }}
                    withPlaceholder
                    src={ art ? artUrl : null }
                    title={ title }
                    alt={ title }
                    onClick={ (e) => props.cover(e)}
                />
                <Group position="apart" direction="column" 
                        style={{ display: "flex", flexGrow: 1}}
                        onClick={()=> props.setMini(true)}>
                    <Group direction="column" noWrap spacing={0}>
                        <Text lineClamp={1} size="sm" >{title}</Text>
                        <Text lineClamp={1} color="dimmed" size="sm">{artist}</Text>
                    </Group>
                    {props.children}
                </Group>
            </Group>           
    );
}

