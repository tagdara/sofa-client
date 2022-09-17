import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import { IconCloud, IconCloudStorm, IconCloudRain, IconDots, IconSun, IconWind } from '@tabler/icons';

export default function WeatherIcon(props) {

    const { modeLabel} = useMode(props.endpointId, props.instance)

    if (!modeLabel) { return <IconDots size={props.size} /> }

    const modeText = modeLabel.toLowerCase()

    const getIcon = () => {
        if (modeText.includes('thunder')) {
            return <IconCloudStorm size={props.size} />
        }
        if (modeText.includes('windy')) {
            return <IconWind size={props.size} />
        }        
        if (modeText.includes('light rain')) {
            return <IconCloudRain size={props.size} />
        }
        if (modeText.includes('rain')) {
            return <IconCloudRain size={props.size} />
        }
        if (modeText.includes('cloud')) {
            return <IconCloud size={props.size} />
        } 
        if (modeText.includes('overcast')) {
            return <IconCloud size={props.size} />
        } 
        return <IconSun size={props.size} />
    }

    return getIcon()
}


