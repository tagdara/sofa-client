import React, { useEffect }from 'react';
import ColorAvatar from 'components/ColorAvatar';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'

import grey from '@mui/material/colors/grey';
import teal from '@mui/material/colors/teal';
import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';


const ThermostatSetpointAvatar = props => {
    
    const thermostat  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'ThermostatSetpointAvatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'ThermostatSetpointAvatar-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, []) 

    if (!thermostat) { return null }

    const doubleSetpoint = thermostat.ThermostatController.hasOwnProperty('upperSetpoint')
    //const setpoints = doubleSetpoint ? [ thermostat.ThermostatController.lowerSetpoint.deepvalue, thermostat.ThermostatController.upperSetpoint.deepvalue ] : thermostat.ThermostatController.targetSetpoint.deepvalue
    const setpoint = doubleSetpoint ? (( thermostat.ThermostatController.lowerSetpoint.deepvalue + thermostat.ThermostatController.upperSetpoint.deepvalue ) /2) : thermostat.ThermostatController.targetSetpoint.deepvalue

    const tempColor = ( temp ) => {
        switch (true) {
            case (!temp):
                return grey[500]
            case (temp < 70): 
                return teal[500]
            case (temp < 75): 
                return green[700]
            case (temp < 90): 
                return orange[500]
            case (temp < 200): 
                return red[500]
            default:
                return grey[500]
        }
    }
    
    const temperatureColor = tempColor(setpoint)

    return (
        <ColorAvatar small={props.small} color={temperatureColor} onClick={props.onClick} reverse={true}>
            { setpoint }
        </ColorAvatar>
    );
}

export default  ThermostatSetpointAvatar;
