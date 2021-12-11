import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister, modeDisplayName } from 'store/deviceHelpers'
import { Badge } from '@mantine/core';

export default function AQIBadge(props) { 

    const aqState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'aqstate='+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'aqstate='+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [ ] )

    if (!aqState) { return null }

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


    const aqController = aqState[props.instance]
    const value = aqController.rangeValue ? aqController.rangeValue.value : modeDisplayName(props.endpointId, props.instance, aqController.mode.value)
    const label = ( props.prefix ? props.prefix + " " : "") + value + (props.suffix ? " "+props.suffix : "")
    const color = aqColor(value)

    return (
        <Badge variant="light" size={props.size ? props.size : "lg"} color={ color } style={{ fontWeight: 500, textTransform: "initial", flexGrow: 1}}>
            { label }
        </Badge>
    );
}


