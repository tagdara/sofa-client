import React from 'react';

import MutedButton from 'endpoint-model/property/muted/MutedButton'
import MutedSwitch from 'endpoint-model/property/muted/MutedSwitch'
import { Group, Text} from '@mantine/core';

export const MutedLine = props => { 

    return (
        <Group noWrap position="apart" style={{ width: "100%"}}>
            <Group noWrap>
                <MutedButton endpointId={props.endpointId} />
                <Text>Muted</Text>
            </Group>
            <MutedSwitch endpointId={props.endpointId} />
        </Group>
    );
}

export default MutedLine


