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

export default function ToggleState(props) {

    function valueOrDefault() {

        if (props.item.command==='TurnOn') {return 'ON'}
        if (props.item.command==='TurnOn') {return 'OFF'}
        var val='OFF'
        try {
            if (props.item.value.hasOwnProperty('toggleState')) {
                val=props.item.value.toggleState
            }
        } 
        catch {}
        return val
    }

    
    function handleChange(e) {
        console.log('changing',props.device.endpointId, 'ToggleController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "toggleState" : e.target.value }, {}, props.item.instance)
        props.directive(props.device.endpointId, 'ToggleController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "toggleState" : e.target.value }, {}, props.item.instance)
    }
    
    return (
        <Select value={valueOrDefault()} onChange={handleChange} input={<BootstrapInput name="toggleState" id="toggleState" />} >
            <MenuItem value=""><em>Choose a property</em></MenuItem>
            <MenuItem value="ON">ON</MenuItem>
            <MenuItem value="OFF">OFF</MenuItem>
        </Select>
    );

}


