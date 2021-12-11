import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getController, register, unregister } from 'store/deviceHelpers'
import { SegmentedControl } from '@mantine/core';

const ThermostatModeButtons = props => {

    const thermostat = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Thermostat-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Thermostat-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!thermostat) { return null }

    function supportedModes() {
        try { 
            return getController(props.endpointId, "ThermostatController").configuration.supportedModes 
            }
        catch {}
        return []
    }

    function handleSetMode(newMode) {
        directive(props.endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const thermostatMode = thermostat.ThermostatController.thermostatMode.value
    const modes = supportedModes().map( mode => { return { label : mode, value : mode}})
    
    return ( 
        <SegmentedControl
                size="xs"
                fullWidth
                value={ thermostatMode }
                data={ modes }
                onChange={handleSetMode}
        />    
    );
}

export default ThermostatModeButtons
