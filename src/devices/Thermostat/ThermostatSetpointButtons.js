import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {      
        setpoint: {
            fontSize: 16,
        }
    }
});

const ThermostatSetpointButtons = props => {
    
    const classes = useStyles();
    const thermostat = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'ThermostatSetpointButtons-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'ThermostatSetpointButtons-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!thermostat) { return null }

    const doubleSetpoint = thermostat.ThermostatController.hasOwnProperty('upperSetpoint')
    //const setpoints = doubleSetpoint ? [ thermostat.ThermostatController.lowerSetpoint.deepvalue, thermostat.ThermostatController.upperSetpoint.deepvalue ] : thermostat.ThermostatController.targetSetpoint.deepvalue
    const setpoint = doubleSetpoint ? (( thermostat.ThermostatController.lowerSetpoint.deepvalue + thermostat.ThermostatController.upperSetpoint.deepvalue ) /2) : thermostat.ThermostatController.targetSetpoint.deepvalue

    function handleSetpointChange(event) {
        directive(props.endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": event, "scale": "FAHRENHEIT"}} )
    }; 

    return ( 
        <ButtonGroup size="small" variant="text"  >
            <Button onClick={ () => handleSetpointChange(setpoint - 1) }><ExpandMoreIcon /></Button>
            <Button className={classes.setpoint} >{setpoint}</Button>
            <Button onClick={ () => handleSetpointChange(setpoint + 1) }><ExpandLessIcon /></Button>
        </ButtonGroup>
    );
}

export default ThermostatSetpointButtons
