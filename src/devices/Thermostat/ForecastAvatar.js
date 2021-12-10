import React, { useEffect } from 'react';
import ColorAvatar from 'components/ColorAvatar';

import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import grey from '@mui/material/colors/grey';
import teal from '@mui/material/colors/teal';
import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';

export default function ForecastAvatar(props) { 

    const forecastDeviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'forecastavatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'forecastavatar-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [ ] )

    
    function forecastHigh() {
        try {
            return forecastDeviceState['Forecast High'].rangeValue.value
        }
        catch {
            return '..'
        }
    }

    function forecastLow() {
        try {
            return forecastDeviceState['Forecast Low'].rangeValue.value
        }
        catch {
            return '..'
        }
    }

    function forecastTempColor() {
        var total = 0 
        var count = 0 
        var high = forecastHigh()
        var low = forecastLow()
        if (high !== "..") {
            total=total+high
            count= count + 1
        }
        if (low !== "..") {
            total=total+low
            count= count + 1
        }
        return tempColor(total / count)
    }

    const tempColor = ( temp ) => {
        switch (true) {
            case (!temp):
                return grey[500]
            case (temp < 70): 
                return teal[500]
            case (temp < 75): 
                return green[700]
            case (temp < 90): 
                return orange[500]
            case (temp < 200): 
                return red[500]
            default:
                return grey[500]
        }
    }
    
    //const temperatureColor = tempColor(setpoint)

    return (

        <ColorAvatar reverse={true} 
                    wideAvatar={true} 
                    small={true} 
                    color={ forecastTempColor() } >
                    { forecastLow()+ " - " + forecastHigh() }
        </ColorAvatar>
    );
}
