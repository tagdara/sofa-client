import React, { useContext}  from 'react';
import { DeviceContext } from './DataContext/DeviceProvider';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
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
        },
        modeGroup: {
            width: "100%",
        }
    }

});

export default function ModeLines(props) {

    const classes = useStyles();
    const { getModes, deviceByEndpointId, isModeNonControllable } = useContext(DeviceContext);
    const device=deviceByEndpointId(props.device.endpointId)
    const modes=getModes(device, props.exclude)
    
    function handleModeChoice(event, mode, modechoice) {
        props.directive(props.device.endpointId, mode, 'SetMode', { "mode": modechoice })
    }; 
    
    return (
        Object.keys(modes).length>0 ?
            <List className={classes.modeGroup}>
            { Object.keys(modes).map(mode => 
                <ListItem key={mode}  >
                    <ListItemText primary={mode} key={mode} />
                    <Select disabled={props.disabled || isModeNonControllable(device,mode)} className={classes.select} displayEmpty 
                            value={props.deviceState[mode].mode.value ? props.deviceState[mode].mode.value : ""} 
                            onChange={ (e) => handleModeChoice(e, mode, e.target.value)} >
                        { Object.keys(modes[mode]).map(modechoice => 
                            <MenuItem key = { modes[mode][modechoice] } value={modechoice}>{modes[mode][modechoice]}</MenuItem>
                        )}
                    </Select>
                </ListItem>
            )}
            </List>
            : null
    )
}

ModeLines.defaultProps = {
  exclude: [],
  disabled: false,
};