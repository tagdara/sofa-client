import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import clsx from  'clsx';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => {
    
    return {    
        button: {
            backgroundColor: theme.palette.background.button,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverButton
            },
        },
        onButton: {
            backgroundColor: theme.palette.background.selectButton,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverSelectButton
            },
 
        },
        partButton: {
            backgroundColor: theme.palette.background.mediumButton,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverButton
            },
        },
    }
});

const MonitorButton = React.memo(props => {
    
    // Need these props:
    // name - actual text name of button or device
    // label - label for button
    // defaultInput - name of default input
    // outlet - name of outlet device

    const classes = useStyles();
    const outlet = props.deviceState[props.outletEndpointId]
    const monitor = props.deviceState[props.endpointId]
    const monitorDefault = monitor && monitor.Input.mode.value === props.defaultInput
    const outletOn = outlet && outlet.PowerController.powerState.value === "ON"
    const outletStandby = outlet && outlet.hasOwnProperty('Energy Level') && outlet['Energy Level'].mode.value === "Standby"

    useEffect(() => {
        props.addEndpointIds('id', props.outletEndpointId, 'MonitorButton-'+props.endpointId)
        props.addEndpointIds('id', props.endpointId, 'MonitorButton-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('MonitorButton-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])


    if (!outlet || !monitor) {  return null }

    function toggleInput(devicename) {
        if (monitorDefault) {
            props.directive(props.endpointId, "ModeController", 'SetMode', { "mode": 'Input.I8' }, {}, 'Matrix.Input' )
        } else {
            props.directive(props.endpointId, "ModeController", 'SetMode', { "mode": props.defaultInput }, {}, 'Matrix.Input' )
        }
    }; 
    
    function buttonState() {
        if (!monitorDefault) { return classes.button }
        if (outletOn && !outletStandby) { return classes.onButton}
        return classes.partButton
    }
    
    // props.className is required for buttons in a buttongroup that have the HOC in between
    // https://stackoverflow.com/questions/57962146/button-components-inside-buttongroup

    return (
        <Button className={ clsx(props.className, buttonState()) } 
                onClick={ () => toggleInput(props.name, props.defaultInput) }>
            {props.label}
        </Button>
    );
}, deviceStatesAreEqual);

export default dataFilter(MonitorButton);
