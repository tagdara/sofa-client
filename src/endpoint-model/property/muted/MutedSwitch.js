import React, { useState } from 'react';
import { Switch } from '@mantine/core';
import useMuted from 'endpoint-model/property/muted/useMuted'
import { useDidUpdate } from '@mantine/hooks';

export default function MutedSwitch(props) { 

    const { muted, setMute } = useMuted(props.endpointId)
    const [ displayState, setDisplayState] = useState(muted)

    useDidUpdate(() => {
        setDisplayState(muted)
    }, [ muted ])

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    function handleChange(event) {
        setDisplayState(event.target.checked)
        event.stopPropagation();
        setMute(event.target.checked)
    };

    return (
        <Switch checked={ displayState } 
                size={props.size ? props.size : "sm"} 
                label={props.label}
                onClick={stopEventPropagation}
                onChange={ handleChange } 
                disabled={props.disabled}
        />
    );
}


