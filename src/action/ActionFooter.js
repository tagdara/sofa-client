import React, { useState } from 'react';

import CardBase from 'components/CardBase';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CropFreeIcon from '@mui/icons-material/CropFree';

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
