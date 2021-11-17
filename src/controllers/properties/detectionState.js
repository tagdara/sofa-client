import React, { useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const DetectionState = props => {
    
    const controller=props.interface.interface.split('.')[1]
    
    useEffect(() => {
        if (props.item.value === undefined) {
            props.directive(props.device.endpointId, controller, 'SetDetectionState', { 'detectionState': 'DETECTED' }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleDetectionStateChange(event) {
        props.directive(props.device.endpointId, controller, 'SetDetectionState', { "detectionState" : event.target.value }, {}, props.item.instance)
    }; 
    
    return (
        <Select value={ props.item.value ? props.item.value.detectionState : "" } onChange={handleDetectionStateChange} size="small" >
            <MenuItem value="DETECTED">Detected</MenuItem>
            <MenuItem value="NOT_DETECTED">Not Detected</MenuItem>
        </Select>
    );

}
export default DetectionState

