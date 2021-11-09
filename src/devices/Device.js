import React, { useEffect } from 'react';

import Switch from '@mui/material/Switch';
import TuneIcon from '@mui/icons-material/Tune';

import SofaItem from 'components/SofaItem';

import { directive } from 'store/directive'
import { deviceByEndpointId } from 'store/deviceHelpers'

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'

const Device = props => {

    const device = deviceByEndpointId(props.endpointId)   
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId])
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

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

    function energy() {
        if (deviceState.hasOwnProperty('Energy Level')) {
            return deviceState["Energy Level"].mode.value
        }

        if (deviceState.hasOwnProperty('EnergySensor')) {
            return deviceState.EnergySensor.power.value+"W"
        }
        return null
    }

    return (    <SofaItem avatarBackground={false} avatarState={ deviceState.PowerController.powerState.value === 'ON' ? 'on' : 'off' } noPad={true}
                    avatar={ props.icon ? props.icon : <TuneIcon />} nested={ props.nested }
                    primary={ device.friendlyName } secondary={ energy()}
                    secondaryActions={
                        <Switch color="primary" checked={ deviceState.PowerController.powerState.value === 'ON' } onChange={ handlePowerChange } />
                    }
                />
    )
}

export default Device;


