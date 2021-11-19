import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import Collapse from '@mui/material/Collapse';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'

import FanPowerLevel from 'devices/Thermostat/FanPowerLevel'
import CardBase from 'components/CardBase'
import CardLineSpacer from 'components/CardLineSpacer'
import ModeLines from 'controllers/ModeController/ModeLines'

import TemperatureSensor from 'devices/Thermostat/TemperatureSensor'
import ThermostatModeButtons from 'devices/Thermostat/ThermostatModeButtons'
import ThermostatSetpointAvatar from 'devices/Thermostat/ThermostatSetpointAvatar'
import ThermostatSetpointButtons from 'devices/Thermostat/ThermostatSetpointButtons'

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {      
    listItem: {
        padding: "0 0 16 24",
        width: '100%',
    },
    bottomListItem: {
        padding: "0 0 0 24",
        width: '100%',
        height: 48,
        minHeight: 48,
    },

    xlistItem: {
        padding: "16px 16px 8px 16px",
    },
    listItemIndent: {
        padding: "16 0 8 64",
        width: '100%',
    },
    speedlistItem: {
        padding: "0 0 8 40",
        width: '100%',
    },
    buttonLine: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        padding: "0 16 8 0",
    },
    button: {
        minWidth: 36
    },
    fanButton: {
        minWidth: 36,
        marginRight: 24,
        backgroundColor: theme.palette.background.button,
    },
    list: {
        padding: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    iconLabel: {
        height: 20,
        width: 20,
        marginRight: 4,
    },
    modeButton: {
        minWidth: 48,
        padding: "4px 8px",
        backgroundColor: theme.palette.background.button,
        borderColor: "rgba(255,255,255, 0) !important",
        marginRight: 1,
        "&:hover" : {
            backgroundColor: theme.palette.background.hoverButton
        },
    },
    selectedButton: {
        minWidth: 48,
        padding: "4px 8px",
        backgroundColor: theme.palette.background.selectButton+"50 !important",
        color: theme.palette.primary.contrastText+" !important",
        borderColor: "rgba(255,255,255, 0) !important",
        marginRight: 1,
        "&:hover" : {
            backgroundColor: theme.palette.background.hoverSelectButton
        },

    },
    buttonGroup: {
        backgroundColor: theme.palette.background.button+" !important",
    },
    detail: {
        width: "100%",
    },
    setpoint: {
        fontSize: 16,
    }
    
    }
});

const Thermostat = props => {
    
    const classes = useStyles();
    const [showDetail, setShowDetail] = useState(false)

    const thermostatDevice = useDeviceStore( state => state.devices[props.endpointId] )
    const thermostat = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Thermostat-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Thermostat-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!thermostat) { return null }

    //function supportedRange() {
        //needs to be applied to the button version but stubbed for now
    //    try {
    //        return getController(props.device.endpointId, "ThermostatController").configuration.supportedRange
    //    }
    //    catch {}
    //    
    //    return [60,90]
    //}

    return ( 
        <CardBase>
            <TemperatureSensor endpointId={props.endpointId} onClick={props.onClick} itemType={"listItem"} />
            <CardLine className={classes.bottomListItem}>
                <>
                    <ThermostatModeButtons endpointId={props.endpointId} />
                    <CardLineSpacer />
                    { thermostat.ThermostatController.thermostatMode.value!=='OFF' &&
                        <ThermostatSetpointAvatar small={true} onClick={() => setShowDetail(!showDetail)} endpointId={props.endpointId} />
                    }
                </>
            </CardLine>
            <Collapse in={showDetail} className={classes.detail}>
                <CardLine>
                    <CardLineText primary={'Heat Set point'} />
                    <ThermostatSetpointButtons endpointId={props.endpointId} />
                </CardLine> 
                <FanPowerLevel endpointId={props.endpointId} />
                <ModeLines directive = { directive } device={thermostatDevice} deviceState={thermostat}  />
            </Collapse>
        </CardBase>
    );
}

export default Thermostat
