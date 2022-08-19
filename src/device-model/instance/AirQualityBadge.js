import React from 'react';
import { modeDisplayName } from 'store/deviceHelpers'
import { Badge } from '@mantine/core';
import { useRegister } from 'store/useRegister'

export default function AirQualityBadge(props) { 

    const { deviceState} = useRegister(props.endpointId)

    if (!deviceState) { return null }

    const aqColor = ( aqi ) => {
        switch (true) {
            case (aqi < 51 || aqi === "Good"):  
                return 'green'
            case (aqi < 101): 
                return 'yellow'
            case (aqi < 151 || aqi === "Fair"): 
                return 'orange'
            case (aqi < 201 || aqi === "Poor"): 
                return 'red'
            case (aqi > 200): 
                return 'purple'
            default:
                return 'grey'
        }
    }

    const aqController = deviceState[props.instance]
    const value = aqController.rangeValue ? aqController.rangeValue.value : modeDisplayName(props.endpointId, props.instance, aqController.mode.value)
    const label = ( props.prefix ? props.prefix + " " : "") + value + (props.suffix ? " "+props.suffix : "")
    const color = aqColor(value)

    return (
        <Badge radius="sm" variant="light" size={props.size ? props.size : "lg"} color={ color } style={{ fontWeight: 500, textTransform: "initial"}}>
            { label }
        </Badge>
    );
}


