import React from 'react';
import { Stack, Text } from '@mantine/core'
import useMediaReporter from 'endpoint-model/controller/MediaReporter/useMediaReporter'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery';

export default function PlayerMediaInfo(props) {
    
    const { artist, title, app } = useMediaReporter(props.endpointId)
    const friendlyName = friendlyNameByEndpointId(props.endpointId)
    const topLine = title || "Idle"
    const secondLine = artist || app || friendlyName

    return ( 
        <Stack spacing={0}>
            <Text lineClamp={2} weight={500} size="lg" style={{ lineHeight: 1.2 }}>{topLine}</Text>
            <Text lineClamp={1} weight={500} color="dimmed" size="md">{secondLine}</Text>
        </Stack> 
    );
}

