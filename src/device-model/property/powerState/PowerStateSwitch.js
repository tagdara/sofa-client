import React, { useState } from 'react';
import { Switch } from '@mantine/core';
import usePowerState from 'device-model/property/powerState/usePowerState'
import { useDidUpdate } from '@mantine/hooks';

export default function PowerStateSwitch(props) { 

    const { powerState, turnOn, turnOff } = usePowerState(props.endpointId, props.instance)
    const [ displayState, setDisplayState] = useState(powerState === "ON")

    useDidUpdate(() => {
        setDisplayState(powerState === "ON")
    }, [ powerState ])

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
        <Switch checked={ displayState } size={props.size ? props.size : "xs"} label={props.label}
            onClick={stopEventPropagation}
            onChange={ handleChange } 
        />
    );
}


