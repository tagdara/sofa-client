import React from 'react';
import { modeDisplayName } from 'store/deviceHelpers'
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, Sun } from 'react-feather';
import { useRegister } from 'store/useRegister'

export default function WeatherAvatar(props) {

    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState || !deviceState[props.instance]) { return null }

    const modeValue = deviceState[props.instance].mode.value
    const modeText = modeDisplayName(props.endpointId, props.instance, modeValue).toLowerCase()

    const getIcon = () => {
        if (modeText.includes('thunder')) {
            return <CloudLightning size={props.size} />
        }
        
        if (modeText.includes('light rain')) {
            return <CloudDrizzle size={props.size} />
        }
        if (modeText.includes('rain')) {
            return <CloudRain size={props.size} />
        }
        if (modeText.includes('cloud')) {
            return <Cloud size={props.size} />
        } 
        if (modeText.includes('overcast')) {
            return <Cloud size={props.size} />
        } 
        return <Sun size={props.size} />
    }

    return getIcon()
}


