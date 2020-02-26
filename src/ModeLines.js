import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => {
    
    return {    
        titleBar: {
            width: "100%",
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
        },
        select: {
            minWidth: "50%",
        }
    }

});

export default function ModeLines(props) {

    const classes = useStyles();


    function handleModeChoice(event, mode, modechoice) {
        props.device[mode].directive('SetMode', { "mode": modechoice })
    }; 

    function getModes() {
        
        var modes={}
        for (var k = 0; k < props.device.interfaces.length; k++) {
            if (props.device[props.device.interfaces[k]].controller==='ModeController') {
                var mc=props.device[props.device.interfaces[k]]
                var modename=mc.capabilityResources.friendlyNames[0].value.text
                if (props.exclude && !props.exclude.includes(modename)) {
                    var modechoices=[]
                    for (var j = 0; j < mc.configuration.supportedModes.length; j++) {
                        modechoices[mc.configuration.supportedModes[j].value] = mc.configuration.supportedModes[j].modeResources.friendlyNames[0].value.text
                    }
                    modes[modename]=modechoices
                }
            }
        }
        return modes
    }
   
    return (
        Object.keys(getModes()).map(mode => 
            <ListItem key={mode}>
                <ListItemText primary={mode} key={mode} />
                <Select disabled={props.disabled} className={classes.select} displayEmpty value={props.device[mode].mode.value ? props.device[mode].mode.value : ""} onChange={ (e) => handleModeChoice(e, mode, e.target.value)} >
                    { Object.keys(getModes()[mode]).map(modechoice => 
                        <MenuItem key = { modechoice } value={modechoice}>{getModes()[mode][modechoice]}</MenuItem>
                    )}
                </Select>
            </ListItem>
        )
    )
}

ModeLines.defaultProps = {
  exclude: [],
  disabled: false,
};