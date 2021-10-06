import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import CloudOffIcon from '@material-ui/icons/CloudOff';
import Button from "@material-ui/core/Button"

import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'

const useStyles = makeStyles(theme => {
    return {        
        icon: {
            marginLeft: 2,
            marginRight: 10,
        },
        button: {
            display: "flex",
            justifyContent: "flex-start"
        }
    }
});

const LightButton = React.memo(props => {

    const classes = useStyles();
    const light = props.devices[props.endpointId]
    const lightState = props.deviceState[ props.endpointId ]
    const fullName = light ? light.friendlyName : "Unknown"
    const name = props.skipPrefix && fullName.startsWith(props.skipPrefix+" ") ? fullName.slice(props.skipPrefix.length) : fullName

    useEffect(() => {
        props.addEndpointIds("id", props.endpointId, "Light"+props.endpointId)
        return function cleanup() {
            props.unregisterDevices("Light"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])    

    if (!lightState ) { return null}

    function togglePower() {
        props.directive(props.endpointId, 'PowerController', on ? 'TurnOff' : 'TurnOn')
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

    return (
        <Button fullWidth variant={ on ? "contained" : "outlined" } color={on ? "primary" : undefined } 
                startIcon={startIcon()} className={classes.button} onClick = {togglePower}>
            { name }
        </Button>
    )

}, deviceStatesAreEqual);

export default dataFilter(LightButton);


