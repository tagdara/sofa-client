import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';


const BootstrapInput = withStyles(theme => ({
    input: {
        minWidth: '100px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

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
    
    console.log('tmode ocnifg', props.interface)
    
    return (
        <Select value={ valueOrDefault() } onChange={handleModeChange} input={<BootstrapInput name="thermostatMode" />} >
            { supportedModes.map( mode => 
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
            )}
        </Select>
    );
}