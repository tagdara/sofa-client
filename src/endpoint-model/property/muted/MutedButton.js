import React from 'react';
import { ActionIcon } from '@mantine/core';
import useMuted from 'endpoint-model/property/muted/useMuted'
import { IconVolume2, IconVolume3 } from '@tabler/icons';

export default function MutedButton(props) { 

    const { muted, toggle } = useMuted(props.endpointId)

    return (
        <ActionIcon 
            size={ props.size ? props.size : "md"}
            color={ muted ? "red" : undefined } 
            variant={ muted ? "filled" : "light" } 
            onClick={toggle} 
        >
            { muted ? <IconVolume3 size={20} /> : <IconVolume2 size={20} /> }
        </ActionIcon>
    );
}


