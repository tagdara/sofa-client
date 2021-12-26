import React, { useState } from 'react';
import { Avatar } from '@mantine/core';
import ThermostatPopover from 'devices/Thermostat/ThermostatPopover'
import useTargetSetpoint from 'device-model/property/targetSetpoint/useTargetSetpoint'
import useThermostatMode from 'device-model/property/thermostatMode/useThermostatMode'

const ThermostatAvatar = props => {

    const { targetSetpointLabel, targetSetpointColor } = useTargetSetpoint(props.endpointId)
    const { thermostatMode } = useThermostatMode(props.endpointId)
    const [ open, setOpen ] = useState(false)

    const togglePopover = () => { setOpen(!open) }

    const setpointAvatar =  <Avatar color={targetSetpointColor} size={props.size ? props.size : "lg"} onClick={ props.noPopover ? undefined : togglePopover } >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 8 }} >
                                    <span>{targetSetpointLabel}</span>
                                    <span style={{ fontSize: 10 }}>{thermostatMode }</span>
                                </div>
                            </Avatar>

    if (props.noPopover) { return setpointAvatar }

    return (
        <ThermostatPopover
            opened = { open }
            setOpen = { setOpen }
            endpointId = { props.endpointId }
            target = {  setpointAvatar }
        />
    );
}

export default ThermostatAvatar;
