import React from 'react';
import { Group, Image, Stack, Text } from '@mantine/core'
import useTokenImage from 'helpers/useTokenImage'
import useMusicController from 'endpoint-model/controller/MusicController/useMusicController'
import { IconMusic } from '@tabler/icons';

export default function PlayerArtOverlay(props) {
    
    const { art, artist, title } = useMusicController(props.endpointId)
    const artOrDefault = art || ""
    const titleLabel = title || "Jukebox is idle"
    const { localImageUrl, imageLoaded } = useTokenImage(artOrDefault)

    return ( 
            <Group noWrap onClick={ (e) => props.onClick(e)}>
                <Image 
                    radius="sm"
                    style={{ display: "flex", flexGrow: 1, maxWidth: "30%" }}
                    withPlaceholder={!imageLoaded}
                    placeholder={<IconMusic style={{ height: "100%", maxWidth: "30%" }} />}
                    src={ imageLoaded ? localImageUrl : null }
                    title={ titleLabel }
                    alt={ titleLabel }
                />
                <Stack spacing="sm" style={{ display: "flex", flexGrow: 2}}
                        onClick={()=> props.setMini(true)}
                >
                    <Stack spacing={0}>
                        <Text lineClamp={2} weight={500} size="lg" style={{ lineHeight: 1.2 }}>{titleLabel}</Text>
                        <Text lineClamp={1} weight={500} color="dimmed" size="md">{artist}</Text>
                    </Stack>
                    {props.children}
                </Stack>
            </Group>           
    );
}

