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
                    style={{ display: "flex", flexGrow: 1, maxWidth: "30%" }}
                    withPlaceholder
                    src={ art ? artUrl : null }
                    title={ title }
                    alt={ title }
                    onClick={ (e) => props.cover(e)}
                />
                <Group position="apart" direction="column" grow
                        style={{ display: "flex", flexGrow: 2}}
                        onClick={()=> props.setMini(true)}>
                    <Group direction="column" noWrap spacing={0}>
                        <Text lineClamp={2} weight={500} size="lg" >{title}</Text>
                        <Text lineClamp={1} weight={500} color="dimmed" size="md">{artist}</Text>
                    </Group>
                    {props.children}
                </Group>
            </Group>           
    );
}

