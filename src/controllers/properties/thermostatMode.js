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
        // Set default if passed undefined
        if (props.interface.thermostatMode.deepvalue()===undefined) {
        //if (props.interface.thermostatMode.deepvalue()===undefined || !props.device.ThermostatController.configuration.supportedModes.includes(props.interface.thermostatMode.deepvalue())) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault('OFF')
            }
        }
    }, [props.interface])
    
    return (
        <Select value={props.interface.thermostatMode.deepvalue() ? props.interface.thermostatMode.deepvalue() : ""} onChange={(e) => props.interface.directive({'value': e.target.value }) } input={<BootstrapInput name="thermostatMode" id="thermostatMode" />} >
            { props.device.ThermostatController.configuration.supportedModes.map( mode => 
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
            )}
        </Select>
    );

}