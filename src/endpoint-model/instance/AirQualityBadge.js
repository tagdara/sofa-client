import React from 'react';
import { Badge } from '@mantine/core';
import useMode from 'endpoint-model/property/mode/useMode'

export default function AirQualityBadge(props) { 

    // This badge uses the Air Quality Mode (from devices such as Dyson Air Filters with non-AQI numeric values)

    const { modeLabel: airQuality } = useMode(props.endpointId, props.instance )

    const aqColor = () => {
        switch (true) {
            case ( airQuality === "Good"):  
                return 'green'
            case (airQuality === "Fair"): 
                return 'orange'
            case (airQuality === "Poor"): 
                return 'red'
            default:
                return 'grey'
        }
    }

    const label = ( props.prefix ? props.prefix + " " : "") + ( airQuality || "?")+ (props.suffix ? " "+props.suffix : "")
    const color = aqColor()
    
    if (!airQuality) { return null }

    return (
        <Badge radius="sm" variant="light" size={props.size ? props.size : "lg"} color={ color } style={{ fontWeight: 500, textTransform: "initial"}}>
            { label }
        </Badge>
    );
}


