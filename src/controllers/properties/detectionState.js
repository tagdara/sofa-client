import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

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

export default function detectionState(props) {
    
    return (
        <Select value={props.value} onChange={props.changeValue} input={<BootstrapInput name="detectionState" id="detectionState" />} >
            <MenuItem value=""><em>Choose an property</em></MenuItem>
            <MenuItem value="DETECTED">DETECTED</MenuItem>
            <MenuItem value="NOT_DETECTED">NOT_DETECTED</MenuItem>
        </Select>
    );

}


