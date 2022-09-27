import React, { useState } from 'react';
import { Avatar } from '@mantine/core';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import { useDidUpdate } from '@mantine/hooks';

export default function PowerStateAvatar(props) { 

    const { powerState, turnOn, turnOff } = usePowerState(props.endpointId)
    const [ displayState, setDisplayState] = useState(powerState === "ON")

    useDidUpdate(() => {
        setDisplayState(powerState === "ON")
    }, [ powerState ])

    function handleChange(event) {
        setDisplayState(event.target.checked)
        if (displayState) { 
            turnOff()
        } else {
            turnOn()
        }
    };

    return (
        <Avatar 
            color = { displayState ? "primary" : undefined }
            size={props.size ? props.size : "lg"} 
            label={props.label}
            onClick={handleChange}
            disabled={props.disabled}
        >
            { props.icon ? props.icon : props.label }
        </Avatar>
    );
}


