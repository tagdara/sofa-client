import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from  'clsx';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'

import { register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    
    return {    
        onButton: {
            backgroundColor: theme.palette.background.selectButton+"70 !important",
            color: theme.palette.primary.contrastText+" !important",
            borderColor: "rgba(255,255,255, 0) !important",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverSelectButton+" !important",
            },
        },
        partButton: {
            backgroundColor: theme.palette.action.disabledBackground+" !important",
            borderColor: "rgba(255,255,255, 0) !important",
            "&:hover" : {
                backgroundColor: theme.palette.action.disabled+" !important",
            },
        },
        button: {
            fontSize: "11px !important",
            boxSizing: "border-box",
        },
        group: {
            marginRight: 4,
            maxWidth: "13% !important",
            minWidth: "13% !important",
            boxSizing: "borderBox",
        }
    }
});

const MonitorButtonStack = props => {
    
    // Need these props:
    // name - actual text name of button or device
    // label - label for button
    // defaultInput - name of default input
    // outlet - name of outlet device

    const classes = useStyles();
    const outlet = useDeviceStateStore( state => state.deviceStates[props.outletEndpointId])
    const monitor = useDeviceStateStore( state => state.deviceStates[props.endpointId])
    const monitorDefault = monitor && monitor.Input.mode.value === props.defaultInput
    const monitorOff = monitor.Input.mode.value === "Input.I8"
    const outletOn = outlet && outlet.PowerController.powerState.value === "ON"
    const outletStandby = outlet && outlet.hasOwnProperty('Energy Level') && outlet['Energy Level'].mode.value === "Standby"

    useEffect(() => {
        register([props.endpointId, props.outletEndpointId], 'MonitorButton-'+props.endpointId)
        return function cleanup() {
            unregister([props.endpointId, props.outletEndpointId], 'MonitorButton-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])


    if (!outlet || !monitor) {  return null }

    function toggleInput(devicename) {
        if (monitorDefault) {
            directive(props.endpointId, "ModeController", 'SetMode', { "mode": 'Input.I8' }, {}, 'Matrix.Input' )
        } else {
            directive(props.endpointId, "ModeController", 'SetMode', { "mode": props.defaultInput }, {}, 'Matrix.Input' )
        }
    }; 
    
    function buttonState() {
        if (!monitorOff && outletOn && !outletStandby) { return classes.onButton}
        return classes.partButton
    }
    
    // props.className is required for buttons in a buttongroup that have the HOC in between
    // https://stackoverflow.com/questions/57962146/button-components-inside-buttongroup

    return (
        <ButtonGroup orientation="vertical" variant="contained" className={classes.group} >
            <Button className={ clsx(classes.button, buttonState()) } 
                    onClick={ () => toggleInput(props.name, props.defaultInput) }>
                {props.label}
            </Button>
            <Button className={ clsx(classes.button, buttonState()) } 
                    onClick={ () => toggleInput(props.name, props.defaultInput) }>
                {monitorOff ? "." : "pc"+props.label}
            </Button>
        </ButtonGroup>
    );
}

export default MonitorButtonStack;
