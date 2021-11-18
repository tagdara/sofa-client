import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function ThermostatMode(props) {
    
    useEffect(() => {
        if (props.item.value===undefined) {
            // Unlike the temperature components which include scale and use value dict, thermostatMode stores the value directly
            // https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-thermostatcontroller.html
            // confirmed 10.16.20 that the thermostat mode directive should have value in the payload
            props.directive(props.device.endpointId, 'ThermostatController', 'SetThermostatMode', {"thermostatMode": {"value": props.interface.configuration.supportedModes[0].value}}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleModeChange(event) {
        props.directive(props.device.endpointId, 'ThermostatController', 'SetThermostatMode', {"thermostatMode" : {"value": event.target.value }}, {}, props.item.instance)
    }; 

    function valueOrDefault() {
        var val='OFF'
        try {
            if (props.item.value.hasOwnProperty('thermostatMode')) {
                val=props.item.value.thermostatMode.value
            }
        } 
        catch {}
        return val
    }

    if (props.compact) {
        return valueOrDefault()
    }

    const supportedModes = props.interface.configuration ? props.interface.configuration.supportedModes : []
    
    return (
        <Select value={ valueOrDefault() } onChange={handleModeChange} size="small" >
            { supportedModes.map( mode => 
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
            )}
        </Select>
    );
}