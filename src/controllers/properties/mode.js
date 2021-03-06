import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AutomationInput from '../../automation/AutomationInput';

export default function Mode(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'ModeController', 'SetMode', {"mode" : props.interface.configuration.supportedModes[0].value}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleModeChange(event) {
        //props.interface.directive('SetMode', event.target.value, {}, props.instance)
        props.directive(props.device.endpointId, 'ModeController', 'SetMode', {"mode" : event.target.value}, {}, props.item.instance)
    }; 

    if (props.compact) {
        if (props.item.value!==undefined) {
            return props.item.value.mode.split('.')[1]
        }
        return ""
    }
    
    return (
        <Select value={props.item.value!==undefined ? props.item.value.mode : ""} onChange={handleModeChange} input={<AutomationInput name="input" />} >
            { props.interface.configuration.supportedModes.map( mode => 
                <MenuItem key={mode.value} value={mode.value}>{mode.value.split('.')[1]}</MenuItem>
            )}
        </Select>
    );

}