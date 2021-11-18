import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Connectivity(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'EndpointHealth', undefined, { "connectivity" : "OK" }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function handleChange(e) {
        props.directive(props.device.endpointId, 'EndpointHealth', undefined, { "connectivity" : e.target.value }, {}, props.item.instance)
    }

    return (
        <Select value={ props.item.value ? props.item.value.connectivity : ''  } onChange={handleChange} size="small" >
            <MenuItem value="OK">Ok</MenuItem>
            <MenuItem value="UNREACHABLE">Unreachable</MenuItem>
        </Select>
    );

}


