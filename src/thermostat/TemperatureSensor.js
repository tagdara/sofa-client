import React, { useContext }from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { LayoutContext } from '../layout/NewLayoutProvider';

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar';

export default function TemperatureSensor(props) { 
    
    const { applyLayoutCard, applyBackPage } = useContext(LayoutContext);
    
    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function switchToHistory() {
        applyBackPage('ThermostatLayout',{})
        applyLayoutCard('ThermostatHistory', { 'device':props.device, 'past':'7d'})
    }
    
    return (
        
        <GridItem wide={props.wide} >
            <ListItem onClick={props.onClick}>
                <ToggleAvatar onClick={ () => switchToHistory()} 
                    avatarState={ tempColor(props.deviceState.TemperatureSensor.temperature.deepvalue) }>
                    {props.deviceState.TemperatureSensor.temperature.value ? props.deviceState.TemperatureSensor.temperature.deepvalue : '--'}
                </ToggleAvatar>
                <ListItemText primary={props.device.friendlyName}  />
           </ListItem>
        </GridItem>
    );
}

