import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import DeviceDialog from 'dialogs/DeviceDialog';
import { deviceByEndpointId } from 'store/deviceHelpers'
import { selectActivityDevice } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

import ActivityDeviceEmpty from 'activity/editor/ActivityDeviceEmpty'
import ActivityDeviceItem from 'activity/editor/ActivityDeviceItem'
import ActivityDeviceMissing from 'activity/editor/ActivityDeviceMissing'


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

    function openSelectDialog() {
        setDeviceSelect(true)
    }

    console.log(endpointId, device)

    return (
        <Grid item xs={props.wide ? 12 : 4 } className={classes.deviceLine} >
            { ( !endpointId && !device) &&
                <ActivityDeviceEmpty onClick={openSelectDialog} />
            }
            { ( endpointId && !device) &&
                <ActivityDeviceMissing endpointId={endpointId} onClick={openSelectDialog} />
            }
            { ( endpointId && device) &&
                <ActivityDeviceItem endpointId={endpointId} device={device} onClick={openSelectDialog} />
            }
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </Grid>
    )
}

export default ActivityDevice
