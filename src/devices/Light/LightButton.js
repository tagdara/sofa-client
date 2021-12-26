import React, { useEffect } from 'react';

import useDeviceStateStore from 'store/deviceStateStore'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import { Button } from '@mantine/core'
import { CloudOff } from 'react-feather'

const LightButton = props => {

    const light = deviceByEndpointId(props.endpointId)
    const lightState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const sendDirective = props.directive ? props.directive : directive

    useEffect(() => {
        register(props.endpointId, "Light"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Light"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])    

    if (!lightState ) { return null}

    function togglePower() {
        sendDirective(props.endpointId, 'PowerController', on ? 'TurnOff' : 'TurnOn')
    }
    
    function isReachable() {
        try {
            if (lightState.EndpointHealth.connectivity.value.value==='OK') {
                return true
            }
        }
        catch {}
        return false
    }

    function startIcon() {
        if (!isReachable) { return <CloudOff size={20} /> }
        return undefined
    }

    const on = lightState.PowerController.powerState.value === 'ON'
    const name = props.skipPrefix && light.friendlyName.startsWith(props.skipPrefix+" ") ? light.friendlyName.slice(props.skipPrefix.length) : light.friendlyName

    return (
        <Button fullWidth variant={on ? 'filled' : 'light'}
                onClick={togglePower}
                leftIcon={startIcon()}
                disabled={!isReachable}
        >
            { name }
        </Button>
    )

}

export default LightButton;


