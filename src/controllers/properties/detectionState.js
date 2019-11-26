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
    
    useEffect(() => {
        console.log('dspropif', props.interface)
        // Set default if passed undefined
        if (props.interface.detectionState.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault('DETECTED')
            }
        }
    }, [props.interface])

    function handleDetectionStateChange(event) {
        props.interface.directive('SetDetectionState', { "detectionState" : event.target.value })
    }; 
    
    return (
        <Select value={ props.interface.detectionState.value ? props.interface.detectionState.value : "" } onChange={handleDetectionStateChange} input={<BootstrapInput name="detectionState" id="detectionState" />} >
            <MenuItem value="DETECTED">DETECTED</MenuItem>
            <MenuItem value="NOT_DETECTED">NOT_DETECTED</MenuItem>
        </Select>
    );

}


