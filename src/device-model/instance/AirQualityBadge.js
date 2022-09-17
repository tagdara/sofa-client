import React from 'react';
import { Badge } from '@mantine/core';
import useRangeValue from 'device-model/property/rangeValue/useRangeValue'

export default function AirQualityBadge(props) { 

    const { rangeValue } = useRangeValue(props.endpointId, props.instance )

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

    const label = ( props.prefix ? props.prefix + " " : "") + ( rangeValue || "?")+ (props.suffix ? " "+props.suffix : "")
    const color = aqColor(rangeValue)

    return (
        <Badge radius="sm" variant="light" size={props.size ? props.size : "lg"} color={ color } style={{ fontWeight: 500, textTransform: "initial"}}>
            { label }
        </Badge>
    );
}


