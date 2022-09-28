import React from 'react';
import PlayerArt from 'devices/Player/PlayerArt';
import PlayerButtons from 'devices/Player/PlayerButtons';
import PlayerMediaInfo from 'devices/Player/PlayerMediaInfo';
import { Group, Stack } from '@mantine/core'

const Player = props => {

    // This is a generic player that can be used directly or as the model for other more specific players
    
    return (
        <Group onClick={props.onClick} noWrap style={{ width: "100%"}}>
            <PlayerArt endpointId={props.endpointId} />
            <Stack style={{ width: "100%"}}>
                <PlayerMediaInfo endpointId={props.endpointId} />
                <PlayerButtons endpointId={props.endpointId} >
                    {props.buttons}
                </PlayerButtons>
            </Stack>
        </Group>
    );
}

export default Player;

