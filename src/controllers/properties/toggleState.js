import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ToggleState = props => {

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
        props.directive(props.device.endpointId, 'ToggleController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "toggleState" : e.target.value }, {}, props.item.instance)
    }
    
    return (
        <Select value={valueOrDefault()} onChange={handleChange} size="small" >
            <MenuItem value=""><em>Choose a property</em></MenuItem>
            <MenuItem value="ON">ON</MenuItem>
            <MenuItem value="OFF">OFF</MenuItem>
        </Select>
    );

}

export default ToggleState


