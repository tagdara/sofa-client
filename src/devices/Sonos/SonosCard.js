import React from 'react';
import { Group, Stack } from '@mantine/core'
import PlayerArt from 'devices/Player/PlayerArt';
import PlayerButtons from 'devices/Player/PlayerButtons';
import PlayerMediaInfo from 'devices/Player/PlayerMediaInfo';
import Speaker from 'devices/Speaker/Speaker.js'

const SonosCard = props => {
    
    const volumePresets = [1, 2, 5, 10];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    return (
        <Stack>
            <Group noWrap style={{ width: "100%"}}>
                <PlayerArt endpointId={props.endpointId} />
                <Stack style={{ width: "100%"}}>
                    <PlayerMediaInfo endpointId={props.endpointId} />
                    <PlayerButtons endpointId={props.endpointId} />
                </Stack>
            </Group>
            <Speaker endpointId={props.endpointId} on={true} volumeMarks={marks} noVolumeMarkLabels={true} />
        </Stack>
    );
}

export default SonosCard;

