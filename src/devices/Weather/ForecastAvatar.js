import React from 'react';
import { Button, Text } from '@mantine/core';
import useRangeValue from 'endpoint-model/property/rangeValue/useRangeValue'

export default function ForecastAvatar(props) { 

    const { rangeValue: forecastHigh } = useRangeValue(props.endpointId, "Forecast.High")
    const { rangeValue: forecastLow } = useRangeValue(props.endpointId, "Forecast.Low")

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

    if (!props.colors) {
        return <Text lineClamp={1} color={props.dimmed && "dimmed"} size={props.size}>{forecastLow+ "° - " + forecastHigh +"°" }</Text>
    }

    return (
        <Button style={{ padding: "0 2px", borderWidth: 0}} 
                compact 
                size="xs" 
                variant={ props.colors ?  "light" : "outline" } 
                color={ props.colors && tempColor(forecastHigh) }
        >
            {forecastLow+ "° - " + forecastHigh +"°" }
        </Button>
    )
}


