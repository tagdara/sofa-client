import React from 'react';
import { SegmentedControl, useMantineTheme } from '@mantine/core'
import useThermostatMode from 'endpoint-model/property/thermostatMode/useThermostatMode'

const ThermostatModeButtons = props => {

    const theme = useMantineTheme()
    const { thermostatMode, selections, setThermostatMode } = useThermostatMode(props.endpointId, props.value, props.directive)
    
    if (!thermostatMode) { return null }

    return ( 
        <SegmentedControl
                color={theme.primaryColor}
                size={props.size ? props.size : "sm"}
                fullWidth
                value={ thermostatMode }
                data={ selections }
                onChange={ setThermostatMode }
        />    
    );
}

export default ThermostatModeButtons
