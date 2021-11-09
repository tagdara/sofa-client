import React from 'react';
import { makeStyles } from '@mui/styles';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { getModes, isModeNonControllable }  from 'store/deviceHelpers';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    },
    nobreak: {
        whiteSpace: "nowrap",
        alignItems: "center",
    }
});

const ModeController = props => {
    
    const classes = useStyles();
    const hasPower = props.deviceState && props.deviceState.hasOwnProperty('PowerController')
    const on = hasPower ? props.deviceState.PowerController.powerState.value !== 'ON' : true
    const modes = getModes(props.device, props.exclude)
    const mode = props.instance.split('.')[1]
    const controllable = isModeNonControllable(props.device, props.instance)

    function handleModeChoice(event, mode, modechoice) {
        props.directive(props.device.endpointId, mode, 'SetMode', { "mode": modechoice })
    }; 

    return (
        <TableRow>
            <TableCell>
                { mode}
            </TableCell>
            <TableCell></TableCell>
            <TableCell className={classes.nobreak} >
                <Select disabled={ props.disabled || !controllable || !on } className={classes.select} displayEmpty 
                        value={ props.deviceState[mode].mode.value ? props.deviceState[mode].mode.value : ""} 
                        onChange={ (e) => handleModeChoice(e, mode, e.target.value)} >
                        { Object.keys(modes[mode]).map(modechoice => 
                            <MenuItem key = { modes[mode][modechoice] } value={modechoice}>{modes[mode][modechoice]}</MenuItem>
                        )}
                </Select>
            </TableCell>
        </TableRow>
    );
}

export default ModeController;

