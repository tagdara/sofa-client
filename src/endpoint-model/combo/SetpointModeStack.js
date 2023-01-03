import React from 'react';
import { Avatar } from '@mantine/core';
import useTargetSetpoint from 'endpoint-model/property/targetSetpoint/useTargetSetpoint'
import useThermostatMode from 'endpoint-model/property/thermostatMode/useThermostatMode'

const ThermostatAvatar = props => {

    const { targetSetpointLabel, targetSetpointColor } = useTargetSetpoint(props.endpointId)
    const { thermostatMode } = useThermostatMode(props.endpointId)

    return (
        <Avatar color={targetSetpointColor} size={props.size ? props.size : "lg"}  >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 8 }} >
                { targetSetpointLabel !== "--" && <span>{targetSetpointLabel}</span> }
                <span style={{ fontSize: 10 }}>{thermostatMode }</span>
            </div>
        </Avatar>
    );
}

export default ThermostatAvatar;
