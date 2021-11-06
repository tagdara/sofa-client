import React, { useEffect } from 'react';
import ToggleAvatar from 'components/ToggleAvatar';

import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'

export default function ForecastAvatar(props) { 

    const forecastDeviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'forecastavatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'forecastavatar-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [ ] )

    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
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

    return (

        <ToggleAvatar reverse={true} 
                    wideAvatar={true} 
                    small={true} 
                    avatarState={ forecastTempColor() } >
                    { forecastLow()+ " - " + forecastHigh() }
        </ToggleAvatar>
    );
}


