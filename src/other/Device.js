import React from 'react';
import { useState, useEffect } from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import GridItem from '../GridItem';

export default function Device(props) {
    
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);

    useEffect(() => {
        setPowerState(props.device.PowerController.powerState.value)
    }, [props.device.PowerController.powerState.value])

    function handlePress(commandName) {
        if (commandName=="OFF") {
            props.device.PowerController.directive('TurnOff')
        } else if (commandName=="ON") {
            props.device.PowerController.directive('TurnOn')
        }
    }   
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        if (event.target.checked) {
            props.device.PowerController.directive('TurnOn')
        } else {
            props.device.PowerController.directive('TurnOff')
        }
    }; 

    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar avatarState={ props.device.PowerController.powerState.value=='ON' ? 'on' : 'off'}><TuneIcon /></ToggleAvatar>
                <ListItemText primary={props.device.friendlyName}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value=='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem> 
    );
}


