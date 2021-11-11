import React from 'react';
import { getModes, isModeNonControllable } from 'store/deviceHelpers';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const useStyles = makeStyles(theme => {
    
    return {    
        titleBar: {
            width: "100%",
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
        },
        modeGroup: {
            width: "100%",
        }
    }

});

const ModeSelect = props => {

    const classes = useStyles();
    const modes = getModes(props.endpointId)
    const mode = modes[props.mode]
    
    return (
        <Select disabled={props.disabled || isModeNonControllable(props.endpointId, props.mode)} 
                variant={"standard"}
                sx={{ minWidth: props.width, maxWidth: props.width}}
                className={classes.select} displayEmpty 
                value={ props.value ? props.value : ""} 
                onChange={ (e)=> props.select(e.target.value)} 
            >
                { Object.keys(mode).map(modechoice => 
                    <MenuItem key = { mode[modechoice] } value={modechoice}>{ mode[modechoice]}</MenuItem>
                )}
        </Select>
    )
}

export default ModeSelect;