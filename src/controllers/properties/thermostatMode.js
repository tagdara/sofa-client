import React, { useEffect } from 'react';
import {withStyles } from '@material-ui/styles';
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
            props.directive(props.device.endpointId, 'ThermostatController', 'SetMode', {"thermostatMode" : { "value" : props.interface.configuration.supportedModes[0].value}}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleModeChange(event) {
        props.directive(props.device.endpointId, 'ThermostatController', 'SetMode', {"thermostatMode" : { "value" : event.target.value}}, {}, props.item.instance)
    }; 
    
    return (
        <Select value={props.item.value ? props.item.value.thermostatMode.value : ""} onChange={handleModeChange} input={<BootstrapInput name="thermostatMode" id="thermostatMode" />} >
            { props.interface.configuration.supportedModes.map( mode => 
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
            )}
        </Select>
    );
}