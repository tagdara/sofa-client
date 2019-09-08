import React, { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import TuneIcon from '@material-ui/icons/Tune';

import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar';


export default function Mode(props) {

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
                <ToggleAvatar avatarState={powerState==='ON' ? 'on' : 'off'}><TuneIcon /></ToggleAvatar>
                <ListItemText primary={props.device.friendlyName}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
            </ListItem>
        </GridItem>
    );
}

