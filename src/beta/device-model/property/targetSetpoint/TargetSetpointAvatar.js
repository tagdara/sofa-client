import React, { useEffect }from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import { Avatar } from '@mantine/core';

const TargetSetpointAvatar = props => {
    
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
                return 'gray'
            case (temp < 70): 
                return 'teal'
            case (temp < 75): 
                return 'green'
            case (temp < 90): 
                return 'orange'
            case (temp < 200): 
                return 'red'
            default:
                return 'gray'
        }
    }
    
    const temperatureColor = tempColor(setpoint)

    return (
        <Avatar size={props.size} color={temperatureColor} onClick={props.onClick}>
            { setpoint }
        </Avatar>
    );
}

export default TargetSetpointAvatar;
