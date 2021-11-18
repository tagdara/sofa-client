import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
        props.directive(props.device.endpointId, 'SwitchController', undefined, { "pressState" : event.target.value }, {}, props.item.instance)
    }; 
    
    return (
        <Select value={ valueOrDefault() } onChange={handlePressStateChange} size="small">
            <MenuItem value="ON">On</MenuItem>
            <MenuItem value="OFF">Off</MenuItem>
        </Select>
    );

}


