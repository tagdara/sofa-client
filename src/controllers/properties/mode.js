import React from 'react';
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

export default function Mode(props) {
    
    function handleModeChange(event) {
        props.interface.directive('SetMode', event.target.value, {}, props.instance)
    }; 

    return (
        <Select value={props.interface.mode.value ? props.interface.mode.value : ""} onChange={handleModeChange} input={<BootstrapInput name="input" id="input" />} >
            { props.device[props.instance].configuration.supportedModes.map( mode => 
                <MenuItem key={mode.value} value={mode.value}>{mode.value.split('.')[1]}</MenuItem>
            )}
        </Select>
    );

}