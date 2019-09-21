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

export default function Connectivity(props) {

    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.connectivity.deepvalue()===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault('OK')
            }
        }
    }, [props.interface])

    return (
        <Select value={ props.interface.connectivity.deepvalue() ? props.interface.connectivity.deepvalue() : ''  } onChange={(e) => props.interface.directive('SetConnectivity',{'value':e.target.value})} input={<BootstrapInput name="connectivity" id="connectivity" />} >
            <MenuItem value="OK">OK</MenuItem>
            <MenuItem value="UNREACHABLE">UNREACHABLE</MenuItem>
        </Select>
    );

}


