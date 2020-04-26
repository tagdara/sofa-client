import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar';

export default function Computer(props) {

    function handlePowerChange(event) {

        if (event.target.checked) {
            props.directive(props.device.endpointId, "PowerController", "TurnOn", {}, {}, "")
        } else {
            props.directive(props.device.endpointId, "PowerController", "TurnOff", {}, {}, "")
        }
    }; 

    function handleLockChange(event) {

        if (event.target.checked) {
            props.directive(props.device.endpointId, "LockController" , "Lock", {}, {}, "")
        } else {
            props.directive(props.device.endpointId, "LockController" , "Unlock", {}, {}, "")
        }
    }; 

    
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar noback={true} avatarState={ props.device.PowerController.powerState.value==='ON' ? 'on' : 'off'}><DesktopWindowsIcon /></ToggleAvatar>
                { props.device.PowerController.powerState.value==='ON' ?
                <ListItemText primary={props.device.friendlyName} secondary={props.device.LockController.lockState.value==='LOCKED' ? 'Locked':'Unlocked'}/>
                : 
                <ListItemText primary={props.device.friendlyName} secondary={'Powered off'}/>
                }
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
            </ListItem>
            { props.device.PowerController.powerState.value==='ON' &&
                <ListItem>
                    <ToggleAvatar avatarState={ props.device.LockController.lockState.value==='LOCKED' ? 'off' : 'on'}>
                        { props.device.LockController.lockState.value==='LOCKED' ? <LockIcon /> : <LockOpenIcon /> }
                    </ToggleAvatar>
                    <ListItemSecondaryAction>
                        <Switch color="primary" checked={props.device.LockController.lockState.value==='LOCKED'} onChange={handleLockChange} />
                    </ListItemSecondaryAction>
               </ListItem>
            }

        </GridItem>   
    );
}
