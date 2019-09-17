import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

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

export default function powerState(props) {
    
    console.log('val',props.interface.powerState.value)
    
    return (
        <Select value={props.interface.powerState.value===null ? 'OFF' : props.interface.powerState.value } onChange={(e) => props.interface.directive( e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' ) } input={<BootstrapInput name="powerState" id="powerState" />} >
            <MenuItem value=""><em>Choose a property</em></MenuItem>
            <MenuItem value="ON">ON</MenuItem>
            <MenuItem value="OFF">OFF</MenuItem>
        </Select>
    );

}


