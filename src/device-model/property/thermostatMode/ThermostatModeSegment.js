import React from 'react';
import useThermostatMode from 'device-model/property/thermostatMode/useThermostatMode'
import Segment from 'components/Segment'

export default function ThermostatModeSegment(props) {

    const { thermostatModeLabel } = useThermostatMode(props.endpointId, props.value, props.directive)

    return (
        <Segment value={ thermostatModeLabel } />
    );
}

