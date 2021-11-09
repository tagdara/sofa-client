import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import CloudOffIcon from '@mui/icons-material/CloudOff';
import Button from "@mui/material/Button"

import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import useDeviceStateStore from 'store/deviceStateStore'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'
import { directive } from 'store/directive'

const useStyles = makeStyles(theme => {
    return {        
        icon: {
            marginLeft: 2,
            marginRight: 10,
        },
        button: {
            minHeight: 48,
            display: "flex",
            justifyContent: "flex-start"
        }
    }
});

const LightButton = props => {

    const classes = useStyles();
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
        if (!isReachable) { return <CloudOffIcon className={classes.icon} /> }
        return <LightbulbOutlineIcon className={classes.icon} />
    }

    const on = lightState.PowerController.powerState.value === 'ON'
    const name = props.skipPrefix && light.friendlyName.startsWith(props.skipPrefix+" ") ? light.friendlyName.slice(props.skipPrefix.length) : light.friendlyName

    return (
        <Button fullWidth variant={ "outlined" } 
                sx={{ borderColor: on ? 'primary.main' : 'action.disabled', color: on ? 'primary.main' : 'action.disabled' }} 
                startIcon={startIcon()} className={classes.button} onClick = {togglePower}>
            { name }
        </Button>
    )

}

export default LightButton;


