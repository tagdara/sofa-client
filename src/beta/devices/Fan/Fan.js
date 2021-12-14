import React, { useEffect } from 'react';
import CardLine from 'beta/components/CardLine'
import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'
import { Switch } from '@mantine/core'
import { FaFan as FanIcon } from "react-icons/fa";

const Fan = props => {

    const device = deviceByEndpointId(props.endpointId)   
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId])

    useEffect(() => {
        register(props.endpointId, "Device-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Device-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])

    if (!deviceState) { return null }

    function handlePowerChange(event) {
        directive(props.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    const on = deviceState.PowerController.powerState.value === 'ON'

    return (    
        <CardLine  size={"lg"}  icon={ props.icon ? props.icon : <FanIcon size={20} />}
                    primary={ device.friendlyName } 
        >
            <Switch color="primary" checked={ on } onChange={ handlePowerChange } />
        </CardLine>
    )
}

export default Fan;


