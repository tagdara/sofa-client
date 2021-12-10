import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import { Button } from '@mantine/core';

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

    return (
        <Button style={{ padding: "0 2px" }} 
                compact size="xs" variant="light" color={tempColor(getForecastHigh())}>
            {getForecastLow()+ "° - " + getForecastHigh() +"°" }
        </Button>
    )
}


