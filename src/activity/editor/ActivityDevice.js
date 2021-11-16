import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CropFreeIcon from '@mui/icons-material/CropFree';

import DeviceDialog from 'dialogs/DeviceDialog';
import DeviceIcon from 'components/DeviceIcon';
import { deviceByEndpointId } from 'store/deviceHelpers'
import { selectActivityDevice } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

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

const ActivityDevice = props => {

    const classes = useStyles();
    const [ deviceSelect, setDeviceSelect]  = useState(false);
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null}

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined

    function closeDialog() {
        setDeviceSelect(false)
    }
    
    function selectDevice(newEndpointId) {
        selectActivityDevice(props.category, props.index, newEndpointId)
    }

    return (
        <Grid item xs={props.wide ? 12 : 4 } className={classes.deviceLine} >
            <ListItem button onClick={() => setDeviceSelect(true) } className={ classes.deviceButton } >
                <ListItemIcon>
                    { device===undefined ? <CropFreeIcon /> : <DeviceIcon name={ device.displayCategories[0] } /> }
                </ListItemIcon>
                <ListItemText   classes={{ primary: classes.primary, secondary: classes.typeLine}} 
                                primary={ device ? device.friendlyName : "Choose a device" } 
                                secondary={ device && device.displayCategories[0]} 
                />
            </ListItem>
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </Grid>
    )
}

export default ActivityDevice
