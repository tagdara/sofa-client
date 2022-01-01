import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import { Button, Text } from '@mantine/core';

export default function ForecastAvatar(props) { 

    const forecastDeviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'forecastavatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'forecastavatar-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    function getForecastHigh() {
        try {
            return forecastDeviceState['Forecast High'].rangeValue.value
        }
        catch {
            return " "
        }
    }

    function getForecastLow() {
        try {
            return forecastDeviceState['Forecast Low'].rangeValue.value
        }
        catch {
            return " "
        }
    }

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
        return <Text lineClamp={1} color={props.dimmed && "dimmed"} size={props.size}>{getForecastLow()+ "° - " + getForecastHigh() +"°" }</Text>
    }

    return (
        <Button style={{ padding: "0 2px", borderWidth: 0}} 
                compact size="xs" variant={ props.colors ?  "light" : "outline" } color={ props.colors && tempColor(getForecastHigh()) }>
            {getForecastLow()+ "° - " + getForecastHigh() +"°" }
        </Button>
    )
}

