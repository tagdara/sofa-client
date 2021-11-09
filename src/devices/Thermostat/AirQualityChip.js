import React, { useEffect } from 'react';

import ColorAvatar from 'components/ColorAvatar';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister, modeDisplayName } from 'store/deviceHelpers'

import grey from '@mui/material/colors/grey';
import green from '@mui/material/colors/green';
import yellow from '@mui/material/colors/yellow';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';
import purple from '@mui/material/colors/purple';

export default function AirQualityChip(props) { 

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
                return green[500]
            case (aqi < 101): 
                return yellow[500]
            case (aqi < 151 || aqi === "Fair"): 
                return orange[500]
            case (aqi < 201 || aqi === "Poor"): 
                return red[500]
            case (aqi > 200): 
                return purple[500]
            default:
                return grey[500]
        }
    }


    const aqController = aqState[props.instance]
    const value = aqController.rangeValue ? aqController.rangeValue.value : modeDisplayName(props.endpointId, props.instance, aqController.mode.value)
    const label = ( props.prefix ? props.prefix + " " : "") + value + (props.suffix ? " "+props.suffix : "")
    const color = aqColor(value)

    return (
        <ColorAvatar small={true}  wideAvatar={true} color={ color } >
            { label }
        </ColorAvatar>
    );
}


