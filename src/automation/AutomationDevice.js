import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CropFreeIcon from '@material-ui/icons/CropFree';

import DeviceDialog from '../DeviceDialog';
import DeviceIcon from '../DeviceIcon';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({

    deviceButton: {
        width: "100%",
        height: 56,
        borderRadius: 4,
    },
    deviceLine: {
        padding: 16,
    }
});

export default function AutomationDevice(props) {

    const [deviceSelect, setDeviceSelect] = useState(false);
    const classes = useStyles();

    function closeDialog() {
        setDeviceSelect(false)
    }
    
    function selectDevice(newdevice) {
        props.selectDevice(newdevice)
        setDeviceSelect(false)
    }

    return (
        <Grid item xs={props.wide ? 12 : 4 } className={classes.deviceLine} >
            <ListItem button onClick={() => setDeviceSelect(true) } className={classes.deviceButton} >
                <ListItemIcon>{ props.device===undefined ? <CropFreeIcon /> : <DeviceIcon name={props.device.displayCategories[0]} /> }</ListItemIcon>
                <ListItemText primary={props.device ? props.device.friendlyName : "Choose a device"} secondary={props.device && props.device.displayCategories[0]} />
            </ListItem>
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </Grid>
    )
}
