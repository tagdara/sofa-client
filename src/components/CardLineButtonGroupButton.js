import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from  'clsx';

import Button from '@mui/material/Button';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'

const useStyles = makeStyles(theme => {
    
    return {    
        button: {
            backgroundColor: theme.palette.background.button+" !important",
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverButton+" !important",
            },
        },
        onButton: {
            backgroundColor: theme.palette.background.selectButton+"70 !important",
            color: theme.palette.primary.contrastText+" !important",
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverSelectButton+" !important",
            },
 
        },
        partButton: {
            backgroundColor: theme.palette.background.mediumButton+" !important",
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverButton+" !important",
            },
        },
    }
});

const MonitorButton = props => {
    
    // Need these props:
    // name - actual text name of button or device
    // label - label for button
    // defaultInput - name of default input
    // outlet - name of outlet device

    const classes = useStyles();

    function toggleInput(devicename) {
        if (monitorDefault) {
            directive(props.endpointId, "ModeController", 'SetMode', { "mode": 'Input.I8' }, {}, 'Matrix.Input' )
        } else {
            directive(props.endpointId, "ModeController", 'SetMode', { "mode": props.defaultInput }, {}, 'Matrix.Input' )
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
}

export default MonitorButton;
