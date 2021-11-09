import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CropFreeIcon from '@mui/icons-material/CropFree';

import DeviceDialog from 'dialogs/DeviceDialog';
import DeviceIcon from 'components/DeviceIcon';


const useStyles = makeStyles({

    deviceButton: {
        width: "100%",
        height: 56,
        borderRadius: 4,
    },
    deviceLine: {
        display: "flex",
        height: 64,
        alignItems: "center",
    },
    typeLine: {
        fontSize: 10,
    },
    primary: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
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
                <ListItemText classes={{ primary: classes.primary, secondary: classes.typeLine}} primary={props.device ? props.device.friendlyName : "Choose a device"} secondary={props.device && props.device.displayCategories[0]} />
            </ListItem>
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </Grid>
    )
}
