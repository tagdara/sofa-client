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

    const [lockState, setLockState] = useState(props.deviceProperties.lockState);
    const [powerState, setPowerState] = useState(props.deviceProperties.powerState);

    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        if (event.target.checked) {
            props.sendAlexaCommand(props.name, props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            props.sendAlexaCommand(props.name, props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 
    
    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar avatarState={ props.deviceProperties.powerState=='ON' ? 'on' : 'off'}><DesktopWindowsIcon /></ToggleAvatar>
                { props.deviceProperties.powerState=='ON' ?
                <ListItemText primary={props.name} secondary={props.deviceProperties.lockState=='LOCKED' ? 'Locked':'Unlocked'}/>
                : 
                <ListItemText primary={props.name} secondary={'Powered off'}/>
                }
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.deviceProperties.powerState=='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem>   
    );
}
