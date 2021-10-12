import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { DeviceContext } from 'context/DeviceContext';

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
    const { getModes, isModeNonControllable } = useContext(DeviceContext);
    const on = props.deviceState ? props.deviceState.PowerController.powerState.value !== 'ON' : false
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
