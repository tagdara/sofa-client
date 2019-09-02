import React from 'react';
import { useState, useEffect } from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import GridItem from '../GridItem';



export default function Computer(props) {

    const [lockState, setLockState] = useState(props.device.LockController.lockState.value);
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);

    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        if (event.target.checked) {
            props.device.PowerController.directive('TurnOn')
        } else {
            props.device.PowerController.directive('TurnOff')
        }
    }; 
    
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar avatarState={ props.device.PowerController.powerState.value=='ON' ? 'on' : 'off'}><DesktopWindowsIcon /></ToggleAvatar>
                { props.device.PowerController.powerState.value=='ON' ?
                <ListItemText primary={props.device.friendlyName} secondary={props.device.LockController.lockState.value=='LOCKED' ? 'Locked':'Unlocked'}/>
                : 
                <ListItemText primary={props.device.friendlyName} secondary={'Powered off'}/>
                }
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value=='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem>   
    );
}
