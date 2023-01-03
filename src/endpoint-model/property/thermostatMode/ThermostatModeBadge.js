import React from 'react';
import useThermostatMode from 'endpoint-model/property/thermostatMode/useThermostatMode'
import { Badge } from '@mantine/core';

export default function ThermostatModeSegment(props) {

    const { thermostatModeLabel } = useThermostatMode(props.endpointId, props.value, props.directive)

    return  <Badge size="sm" radius={"xs"}>{thermostatModeLabel}</Badge>

}

