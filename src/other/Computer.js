import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar';

export default function Computer(props) {

    function handlePowerChange(event) {

        if (event.target.checked) {
            props.device.PowerController.directive('TurnOn')
        } else {
            props.device.PowerController.directive('TurnOff')
        }
    }; 
    
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar avatarState={ props.device.PowerController.powerState.value==='ON' ? 'on' : 'off'}><DesktopWindowsIcon /></ToggleAvatar>
                { props.device.PowerController.powerState.value==='ON' ?
                <ListItemText primary={props.device.friendlyName} secondary={props.device.LockController.lockState.value==='LOCKED' ? 'Locked':'Unlocked'}/>
                : 
                <ListItemText primary={props.device.friendlyName} secondary={'Powered off'}/>
                }
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem>   
    );
}
