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
    
    function summarizeThermostatSetting() {
        if (props.deviceProperties.hasOwnProperty('thermostatMode')) {
            if (props.deviceProperties.thermostatMode=='OFF') {
                return 'Off'
            }
        } else {
            return null
        }
        if (props.deviceProperties.hasOwnProperty('upperSetpoint') && props.deviceProperties.hasOwnProperty('upperSetpoint')) {
            return 'Range set to '+props.deviceProperties.lowerSetpoint.value+'° - '+props.deviceProperties.upperSetpoint.value+'°'
        }
        if (props.deviceProperties.hasOwnProperty('targetSetpoint')) {
            return 'Heat set to '+props.deviceProperties.targetSetpoint.value+'°'
        }
        return ''
    }
    
    return (
        props.deviceProperties.hasOwnProperty('temperature') &&
        <GridItem wide={props.wide} >
            <ListItem onClick={props.onClick}>
                <ToggleAvatar onClick={ () => switchToHistory()} avatarState={ tempColor(props.deviceProperties.temperature.value)}>{props.deviceProperties.temperature.value}</ToggleAvatar>
                <ListItemText primary={props.name} secondary={summarizeThermostatSetting()} />
           </ListItem>
       </GridItem>
    );
}

export default withLayout(TemperatureSensor);
