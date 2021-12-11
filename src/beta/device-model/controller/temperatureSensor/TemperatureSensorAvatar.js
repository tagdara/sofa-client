import React, { useEffect }from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import { Avatar } from '@mantine/core';
const TemperatureSensorAvatar = props => {
    
    const deviceState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'TemperatureSensorAvatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'TemperatureSensorAvatar-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, []) 

    if (!deviceState) { return null }

    const temperature = deviceState.TemperatureSensor.temperature.value.value

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
    
    const temperatureColor = tempColor(temperature)

    return (
        <Avatar size="lg" color={temperatureColor} onClick={props.onClick}>
            { temperature+"°" }
        </Avatar>
    );
}

export default TemperatureSensorAvatar;
