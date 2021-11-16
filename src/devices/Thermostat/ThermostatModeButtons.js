import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import useDeviceStateStore from 'store/deviceStateStore'

import { directive } from 'store/directive'
import { getController, register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {      
        xxmodeButton: {        
            backgroundColor: theme.palette.action.disabledBackground+" !important",
            //color: theme.palette.text.primary+" !important",
            //borderColor: theme.palette.action.disabled+" !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.action.disabled+" !important",
            },
        },
        xmodeButton: {
            minWidth: 48,
            padding: "4px 8px",
            //backgroundColor: theme.palette.background.button,
            //borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            "&:hover" : {
                //backgroundColor: theme.palette.background.hoverButton
            },
        },
        xselectedButton: {
            minWidth: 48,
            padding: "4px 8px",
            //backgroundColor: theme.palette.background.selectButton+"50 !important",
            //color: theme.palette.primary.contrastText+" !important",
            //borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            "&:hover" : {
                //backgroundColor: theme.palette.background.hoverSelectButton
            },
        },
        buttonGroup: {
            border: "none",
            //backgroundColor: theme.palette.background.button+" !important",
        },
    }
});

const ThermostatModeButtons = props => {
    
    const classes = useStyles();
    const thermostat = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Thermostat-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Thermostat-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!thermostat) { return null }

    function supportedModes() {
        try { 
            return getController(props.endpointId, "ThermostatController").configuration.supportedModes 
            }
        catch {}
        return []
    }

    function handleSetMode(event ,newMode) {
        directive(props.endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const thermostatMode = thermostat.ThermostatController.thermostatMode.value
    
    return ( 
        <ToggleButtonGroup  className={classes.buttonGroup} size="small" variant="text" 
                            color="primary" exclusive 
                            value={thermostatMode}
                            onChange={handleSetMode}
                            >
            { supportedModes().map((mode) => (
                <ToggleButton size="small" key = {mode+'m'} value={mode} >
                    {mode}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

export default ThermostatModeButtons
