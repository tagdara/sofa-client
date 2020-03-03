import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';

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

export default function DetectionState(props) {
    
    console.log('dstate props', props)
    const controller=props.interface.interface.split('.')[1]
    
    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, controller, 'SetDetectionState', { 'detectionState': 'DETECTED' }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleDetectionStateChange(event) {
        props.directive(props.device.endpointId, controller, 'SetDetectionState', { "detectionState" : event.target.value }, {}, props.item.instance)
    }; 
    
    return (
        <Select value={ props.item.value ? props.item.value.detectionState : "" } onChange={handleDetectionStateChange} input={<BootstrapInput name="detectionState" id="detectionState" />} >
            <MenuItem value="DETECTED">DETECTED</MenuItem>
            <MenuItem value="NOT_DETECTED">NOT_DETECTED</MenuItem>
        </Select>
    );

}


