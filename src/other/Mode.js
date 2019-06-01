import React from 'react';
import { useState, useEffect } from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';
import GridItem from '../GridItem';


export default function Mode(props) {

    const [powerState, setPowerState] = useState(props.deviceProperties.powerState);
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        if (event.target.checked) {
            props.sendAlexaCommand(props.name, 'logic:mode:'+props.name, 'PowerController', 'TurnOn')
        } else {
            props.sendAlexaCommand(props.name, 'logic:mode:'+props.name, 'PowerController', 'TurnOff')
        }
    }; 
    
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar avatarState={props.deviceProperties.powerState=='ON' ? 'on' : 'off'}><TuneIcon /></ToggleAvatar>
                <ListItemText primary={props.name}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.deviceProperties.powerState=='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
            </ListItem>
        </GridItem>
    );
}

