import React, { useEffect } from 'react';

import Switch from '@mui/material/Switch';
import FanIcon from 'resources/FanIcon';

import ItemBase from 'components/ItemBase';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'

import useDeviceStateStore from 'store/deviceStateStore'

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
        <ItemBase itemType={props.itemType}>
            <CardLine inList={props.itemType === "listItem"}>
                <CardLineIcon on={on}>
                    { props.icon ? props.icon : <FanIcon />}
                </CardLineIcon>
                <CardLineText primary={ device.friendlyName } />
                <Switch color="primary" checked={ on } onChange={ handlePowerChange } />
            </CardLine>
        </ItemBase>
    )
}

export default Fan;


