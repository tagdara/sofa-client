import React, { useState, useEffect } from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import TuneIcon from '@material-ui/icons/Tune';

import GridItem from '../GridItem';

export default function Device(props) {
    
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);

    useEffect(() => {
        setPowerState(props.device.PowerController.powerState.value)
    }, [props.device.PowerController.powerState.value])

    function handlePowerChange(event) {
        setPowerState(event.target.checked ? 'ON' : 'OFF');
        if (event.target.checked) {
            props.device.PowerController.directive('TurnOn')
        } else {
            props.device.PowerController.directive('TurnOff')
        }
    }; 

    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar avatarState={ powerState==='ON' ? 'on' : 'off'}><TuneIcon /></ToggleAvatar>
                <ListItemText primary={props.device.friendlyName}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={powerState==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem> 
    );
}


