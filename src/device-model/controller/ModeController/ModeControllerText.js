import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import { Group, Text} from '@mantine/core';

export default function ModeControllerText(props) {

    const { modeLabel } = useMode(props.endpointId, props.instance)

    return (
        <Group>
            <Text lineClamp={1} size={props.size}>{modeLabel}</Text>
            { props.secondary &&
                <Text>{props.secondary}</Text>
            }
        </Group>
    );
}


