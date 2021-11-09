import React from 'react';
import { withStyles } from '@mui/styles';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

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

export default function PressState(props) {

    function valueOrDefault() {
        console.log('propsitme',props.item)
        var val='ON'
        try {
            if (props.item.value.hasOwnProperty('pressState')) {
                val=props.item.value.pressState
            }
        } 
        catch {
            console.log('some error', props.item.value)
        }
        return val
    }

    function handlePressStateChange(event) {
        console.log(event)
        props.directive(props.device.endpointId, 'SwitchController', undefined, { "pressState" : event.target.value }, {}, props.item.instance)
    }; 
    
    return (
        <Select value={ valueOrDefault() } onChange={handlePressStateChange} input={<BootstrapInput name="pressState" id="pressState" />} >
            <MenuItem value="ON">ON</MenuItem>
            <MenuItem value="OFF">OFF</MenuItem>
        </Select>
    );

}


