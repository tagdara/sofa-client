import React from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import TuneIcon from '@material-ui/icons/Tune';

import GridItem from '../GridItem';

export default function Device(props) {
 
    function handlePowerChange(event) {
        props.directive(props.device.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar noback={true} avatarState={ props.device.PowerController.powerState.value==='ON' ? 'on' : 'off'}>{ props.icon ? props.icon : <TuneIcon />}</ToggleAvatar>
                <ListItemText primary={props.device.friendlyName}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem> 
    );
}


