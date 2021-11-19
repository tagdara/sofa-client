import React, { useEffect } from 'react';

import ItemBase from "components/ItemBase";
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import Switch from '@mui/material/Switch';
import TuneIcon from '@mui/icons-material/Tune';

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'

export default function Mode(props) {

    const mode = deviceByEndpointId(props.endpointId)
    const name = mode.friendlyName
    const modeState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const on = modeState.PowerController.powerState.value==='ON'

    useEffect(() => {
        register(props.endpointId, "Mode"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Mode"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])    

    function handlePowerChange(event) {
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    return (
        <ItemBase itemType={ props.itemType } small={ props.small} >
            <CardLine>
                <CardLineIcon on={on}><TuneIcon /></CardLineIcon>
                <CardLineText primary={name}/>
                    <Switch color="primary" checked={on} onChange={handlePowerChange} />
            </CardLine>
        </ItemBase>
    );
}

