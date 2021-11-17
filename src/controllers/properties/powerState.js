import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function PowerState(props) {

    function valueOrDefault() {

        if (props.item.command==='TurnOn') {return 'ON'}
        if (props.item.command==='TurnOff') {return 'OFF'}
        var val='OFF'
        try {
            if (props.item.value.hasOwnProperty('powerState')) {
                val=props.item.value.powerState
            }
        } 
        catch {}
        return val
    }

    function handleChange(e) {
        console.log('changing',props.device.endpointId, 'PowerController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "powerState" : e.target.value }, {}, props.item.instance)
        props.directive(props.device.endpointId, 'PowerController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "powerState" : e.target.value }, {}, props.item.instance)
    }
    
    return (
        <Select value={valueOrDefault()} onChange={handleChange} size="small" >
            <MenuItem value=""><em>Choose a property</em></MenuItem>
            <MenuItem value="ON">On</MenuItem>
            <MenuItem value="OFF">Off</MenuItem>
        </Select>
    );

}


