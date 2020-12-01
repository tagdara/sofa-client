import React, { useState } from 'react';

import CardBase from '../CardBase';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CropFreeIcon from '@material-ui/icons/CropFree';

import DeviceIcon from '../DeviceIcon';
import DeviceDialog from "../DeviceDialog";

export default function DisplayAction(props) {
    
    const [showDeviceDialog, setShowDeviceDialog] = useState(false)

    function closeDeviceDialog() {
        setShowDeviceDialog(false)
    }
    
    function openDeviceDialog() {
        setShowDeviceDialog(true)
    }
  
    //  onClick={ props.toggleEdit }
    return (
        <CardBase wide={true} small={true} >
            <ListItem onClick={openDeviceDialog}>
                <ListItemIcon>{ props.device===undefined ? <CropFreeIcon /> : <DeviceIcon name={props.device.displayCategories[0]} /> }</ListItemIcon>
                <ListItemText primary={"Add new action"} />
            </ListItem>
            <DeviceDialog open={showDeviceDialog} close={closeDeviceDialog} />
        </CardBase>
    )
}
