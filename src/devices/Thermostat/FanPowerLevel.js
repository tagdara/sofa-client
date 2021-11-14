import React, { useState, useEffect } from 'react';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'

import SofaAvatarSlider from 'components//SofaAvatarSlider'

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getController, register, unregister } from 'store/deviceHelpers'

const FanPowerLevel = props => {
    
    const [powerLevel, setPowerLevel] = useState(false)
    const thermostat = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Thermostat-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Thermostat-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    useEffect(() => {
        if (thermostat) {
            if (thermostat.hasOwnProperty('PowerLevelController')) {
                setPowerLevel(thermostat.PowerLevelController.powerLevel.value)
            }
        }
    // eslint-disable-next-line 
    }, [thermostat]);

    if (!thermostat || !thermostat.hasOwnProperty('PowerLevelController') ) { return null }

    if (showFanPowerLevel() === false) { return null }
    
    function handlePrePowerLevelChange(event) {
        setPowerLevel(event);
    }; 
    
    function handlePowerLevelChange(event) {
        directive(props.endpointId, "PowerLevelController", "SetPowerLevel", {"powerLevel": event})
    }; 

    function showFanPowerLevel() {
        // This is for Dyson
        if (getController(props.endpointId, 'Fan Mode')) {
            if (thermostat['Fan Mode'].mode.value!=='FAN') {
                return false
            } 
        }
        return true
    }

    return ( 
            <CardLine>
                <CardLineText primary={"Fan"} />
                <SofaAvatarSlider  small={true} reverse={true} minWidth={160} 
                                    value={powerLevel} step={10} noPad={true}
                                    preChange={handlePrePowerLevelChange} change={handlePowerLevelChange} />
            </CardLine>
    );
}

export default FanPowerLevel
