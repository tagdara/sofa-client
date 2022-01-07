import React from 'react';
import { ActionIcon } from '@mantine/core';
import useMuted from 'device-model/property/muted/useMuted'
import { VolumeX, Volume2 } from 'react-feather'

export default function MutedButton(props) { 

    const { muted, toggle } = useMuted(props.endpointId)

    return (
        <ActionIcon size={props.size ? props.size : "md"} color={ muted ? "red" : undefined } variant={ muted ? "filled" : "light" } onClick={toggle} >
            { muted ? <VolumeX size={20} /> : <Volume2 size={20} /> }
        </ActionIcon>
    );
}


