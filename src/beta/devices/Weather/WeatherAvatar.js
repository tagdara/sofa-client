import React from 'react';
import { modeDisplayName } from 'store/deviceHelpers'
import { Avatar } from '@mantine/core';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, Sun } from 'react-feather';
import { useRegister } from 'store/useRegister'

export default function WeatherAvatar(props) {

    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState || !deviceState[props.instance]) { return null }

    const modeValue = deviceState[props.instance].mode.value
    const modeText = modeDisplayName(props.endpointId, props.instance, modeValue).toLowerCase()

    const getIcon = () => {
        if (modeText.includes('thunder')) {
            return <CloudLightning />
        }
        
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


