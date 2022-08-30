import React from 'react';
import { Group, Image, Text } from '@mantine/core'
import { Music } from 'react-feather'
import useTokenImage from 'helpers/useTokenImage'
import { Stack } from 'react-bootstrap-icons';

export default function PlayerArtOverlay(props) {
    
    const data = props.deviceState && props.deviceState.MusicController ? props.deviceState.MusicController : {}
    var coverDefault = ""
    const art = data.art ? data.art.value : coverDefault
    const title = data.title ? data.title.value : "Jukebox is idle"
    const artist = data.artist ? data.artist.value : ""
    const { localImageUrl, imageLoaded } = useTokenImage(art)

    return ( 
            <Group noWrap>
                <Image 
                    radius="sm"
                    style={{ display: "flex", flexGrow: 1, maxWidth: "30%" }}
                    withPlaceholder={!imageLoaded}
                    placeholder={<Music style={{ height: "100%", maxWidth: "30%" }} />}
                    src={ imageLoaded ? localImageUrl : null }
                    title={ title }
                    alt={ title }
                    onClick={ (e) => props.cover(e)}
                />
                <Stack  style={{ display: "flex", flexGrow: 2}}
                        onClick={()=> props.setMini(true)}
                >
                    <Stack spacing={0}>
                        <Text lineClamp={2} weight={500} size="lg" style={{ lineHeight: 1.2 }}>{title}</Text>
                        <Text lineClamp={1} weight={500} color="dimmed" size="md">{artist}</Text>
                    </Stack>
                    {props.children}
                </Stack>
            </Group>           
    );
}

