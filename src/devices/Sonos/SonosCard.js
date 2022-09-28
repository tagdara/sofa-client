import React from 'react';
import { Stack } from '@mantine/core'
import Player from 'devices/Player/Player';
import Speaker from 'devices/Speaker/Speaker.js'

const SonosCard = props => {
    
    const volumePresets = [1, 2, 5, 10];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    return (
        <Stack>
            <Player endpointId={props.endpointId} />
            <Speaker endpointId={props.endpointId} on={true} volumeMarks={marks} noVolumeMarkLabels={true} />
        </Stack>
    );
}

export default SonosCard;

