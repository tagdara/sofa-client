import React, { useState } from 'react';
import { Switch } from '@mantine/core';
import useToggleState from 'beta/device-model/property/toggleState/useToggleState'
import { useDidUpdate } from '@mantine/hooks';

export default function ToggleStateSwitch(props) { 

    const { toggleState, turnOn, turnOff } = useToggleState(props.endpointId, props.instance)
    const [ displayState, setDisplayState] = useState(toggleState === "ON")

    useDidUpdate(() => {
        setDisplayState(toggleState === "ON")
    }, [ toggleState ])

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }


    function handleChange(event) {
        setDisplayState(event.target.checked)
        event.stopPropagation();
        if (event.target.checked) { 
            turnOn()
        } else {
            turnOff()
        }
    };

    return (
        <Switch checked={ displayState } size={"xs"} label={props.label}
            onClick={stopEventPropagation}
            onChange={ handleChange } 
        />
    );
}


