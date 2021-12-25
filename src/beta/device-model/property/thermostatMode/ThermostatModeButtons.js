import React from 'react';
import { SegmentedControl } from '@mantine/core';
import useThermostatMode from 'beta/device-model/property/thermostatMode/useThermostatMode'

const ThermostatModeButtons = props => {

    const { thermostatMode, selectModes, setThermostatMode } = useThermostatMode(props.endpointId, props.value, props.directive)
    
    if (!thermostatMode) { return null }

    return ( 
        <SegmentedControl
                size={props.size ? props.size : "xs"}
                fullWidth
                value={ thermostatMode }
                data={ selectModes }
                onChange={ setThermostatMode }
        />    
    );
}

export default ThermostatModeButtons
