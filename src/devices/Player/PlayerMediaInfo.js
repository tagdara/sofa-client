import React from 'react';
import { Stack, Text } from '@mantine/core'
import useMusicController from 'endpoint-model/controller/MusicController/useMusicController'

export default function PlayerArtOverlay(props) {
    
    const { artist, title } = useMusicController(props.endpointId)

    return ( 
        <Stack spacing={0}>
                <Text lineClamp={2} weight={500} size="lg" style={{ lineHeight: 1.2 }}>{title}</Text>
                <Text lineClamp={1} weight={500} color="dimmed" size="md">{artist}</Text>
        </Stack> 
    );
}

