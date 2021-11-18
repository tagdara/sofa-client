import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getInputs } from 'store/deviceHelpers'

const Input = props => {

    const inputs = getInputs(props.device.endpointId)
    
    useEffect(() => {
        if (props.item.value === undefined) {
            props.directive(props.device.endpointId, 'InputController', 'SelectInput', { "input" : inputs[0] }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [ props.item, props.device, props.interface ])
    
    function handleInputChange(e) {
        props.directive(props.device.endpointId, 'InputController', 'SelectInput', { "input" : e.target.value }, {}, props.item.instance)
    }

    return (
        <Select value={props.item.value ? props.item.value.input : ""} onChange={handleInputChange} size="small" >
            { inputs.map( inp => 
                <MenuItem key={inp} value={inp}>{inp}</MenuItem>
            )}
        </Select>
    );

}

export default Input