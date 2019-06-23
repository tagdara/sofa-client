import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withLayout } from '../layout/NewLayoutProvider';

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar';

function TemperatureSensor(props) { 
    
    function tempColor(temp) {
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function switchToHistory() {
        props.applyBackPage('ThermostatLayout',{})
        props.applyLayoutCard('ThermostatHistory', { 'device':props.device, 'days':7})
    }
    
    return (
        props.deviceProperties.hasOwnProperty('temperature') &&
        <GridItem wide={props.wide} >
            <ListItem onClick={props.onClick}>
                <ToggleAvatar onClick={ () => switchToHistory()} avatarState={ tempColor(props.deviceProperties.temperature.value)}>{props.deviceProperties.temperature.value}</ToggleAvatar>
                { props.deviceProperties.hasOwnProperty('targetSetpoint') ?
                    <ListItemText primary={props.name} secondary={props.deviceProperties.thermostatMode=='OFF' ? 'Off' : 'Heat set to '+props.deviceProperties.targetSetpoint.value}/>
                    :
                    <ListItemText primary={props.name} />
                }
           </ListItem>
       </GridItem>
    );
}

export default withLayout(TemperatureSensor);
