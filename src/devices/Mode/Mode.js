import React, { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';
import TuneIcon from '@mui/icons-material/Tune';

import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';


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

