import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { modeDisplayName, register, unregister } from 'store/deviceHelpers'
import { Avatar } from '@mantine/core';
import { Cloud, CloudDrizzle, CloudRain, Sun } from 'react-feather';

export default function WeatherAvatar(props) {

    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'WeatherAvatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'WeatherAvatar-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [ ] )

    if (!deviceState || !deviceState[props.instance]) { return null }

    const modeValue = deviceState[props.instance].mode.value
    const modeText = modeDisplayName(props.endpointId, props.instance, modeValue).toLowerCase()

    
    const getIcon = () => {
        if (modeText.includes('light rain')) {
            return <CloudDrizzle />
        }
        if (modeText.includes('rain')) {
            return <CloudRain />
        }
        if (modeText.includes('cloud')) {
            return <Cloud />
        } 
        return <Sun />
    }

    return (
        <Avatar size={props.size}>
            {getIcon()}
        </Avatar>
    );
}


