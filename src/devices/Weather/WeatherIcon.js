import React from 'react';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, Sun } from 'react-feather';
import useMode from 'device-model/property/mode/useMode'
import { IconDots} from '@tabler/icons';

export default function WeatherAvatar(props) {

    const { modeLabel} = useMode(props.endpointId, props.instance)

    if (!modeLabel) { return <IconDots size={props.size} /> }

    const modeText = modeLabel.toLowerCase()

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


