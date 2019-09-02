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
        if (props.device.hasOwnProperty('ThermostatController')) {
            if (props.device.ThermostatController.thermostatMode.value=='OFF') {
                return 'Off'
            }
        } else {
            return null
        }
    
        if (props.device.ThermostatController.hasOwnProperty('upperSetpoint') && props.device.ThermostatController.upperSetpoint.value ) {
            return 'Range set to '+props.device.ThermostatController.lowerSetpoint.value.value+'° - '+props.device.ThermostatController.upperSetpoint.value.value+'°'
        }
        if (props.device.ThermostatController.hasOwnProperty('targetSetpoint') && props.device.ThermostatController.targetSetpoint.value) {
            return 'Heat set to '+props.device.ThermostatController.targetSetpoint.value.value+'°'
        }
        return ''
    }
    
    return (
        
        <GridItem wide={props.wide} >
            <ListItem onClick={props.onClick}>
                <ToggleAvatar onClick={ () => switchToHistory()} 
                    avatarState={ props.device.TemperatureSensor.temperature.value ? tempColor(props.device.TemperatureSensor.temperature.value.value) : 'notready'}>
                    {props.device.TemperatureSensor.temperature.value ? props.device.TemperatureSensor.temperature.value.value : '--'}
                </ToggleAvatar>
                <ListItemText primary={props.device.friendlyName} secondary={summarizeThermostatSetting()} />
           </ListItem>
       </GridItem>
    );
}

export default withLayout(TemperatureSensor);
