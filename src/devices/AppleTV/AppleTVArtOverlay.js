import React from 'react';
import { Group, Image, Stack, Text } from '@mantine/core'
import { IconBrandApple } from '@tabler/icons';
import useArt from 'endpoint-model/property/art/useArt'
import useTitle from 'endpoint-model/property/title/useTitle'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import useApp from 'endpoint-model/property/app/useApp'

export default function AppleTvArtOverlay(props) {
    
    const { image, imageLoaded } = useArt(props.endpointId)
    const { title } = useTitle(props.endpointId)
    const titleLabel = title || "Idle"
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { app: appName } = useApp(props.endpointId)
    const sourceLabel = appName || name

    return ( 
            <Group noWrap onClick={ (e) => props.onClick(e)}>
                <Image 
                    radius="sm"
                    style={{ display: "flex", flexGrow: 1, maxWidth: "30%" }}
                    withPlaceholder={!imageLoaded}
                    placeholder={<IconBrandApple style={{ height: "100%", maxWidth: "30%" }} />}
                    src={ imageLoaded ? image : null }
                    title={ titleLabel }
                    alt={ titleLabel }
                />
                <Stack spacing="sm" style={{ display: "flex", flexGrow: 2}} >
                    <Stack spacing={0}>
                        <Text lineClamp={2} weight={500} size="md" style={{ lineHeight: 1.2 }}>{titleLabel}</Text>
                        <Text lineClamp={1} weight={500} color="dimmed" size="md">{sourceLabel}</Text>
                    </Stack>
                    {props.children}
                </Stack>
            </Group>           
    );
}

