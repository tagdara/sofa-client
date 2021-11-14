import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MonitorIcon from '@mui/icons-material/PersonalVideo';
import DesktopIcon from '@mui/icons-material/Dns';

import useDeviceStateStore from 'store/deviceStateStore'
import { compareState, endpointIdsByFriendlyName, register, unregister } from 'store/deviceHelpers'

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
        group: {
            paddingRight: 8,
            paddingLeft: 0,
        },
        count: {
            paddingRight:4,
        },
        label: {
            padding: "2px !important",
        }

    }
});

const MonitorButtonStackLabel = props => {

    const classes = useStyles();
    const outlets = endpointIdsByFriendlyName(props.outlets)
    const states = useDeviceStateStore( state => Object.fromEntries(outlets.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    useEffect(() => {
        register(outlets, 'MonitorButtonStackLabel')
        return function cleanup() {
            unregister(outlets, 'MonitorButtonStackLabel')
        };
    // eslint-disable-next-line 
    }, [])

    function onCount() {
        // Checks first to see if the outlet is on, then whether or not there is significant
        // energy use.

        var onDevs = 0;
        for (var dev in states) {
            var outlet = states[dev]
            if ( states[dev] ) {
                if (outlet && outlet.PowerController.powerState.value === 'ON') {
                    if (outlet.hasOwnProperty('Energy Level')) {
                        if (outlet['Energy Level'].mode.value !== 'Standby') {
                            onDevs += 1
                        }
                    } else {
                        onDevs += 1
                    }
                }
            }
        }
        return onDevs
    }

    return (
        <ButtonGroup orientation="vertical" variant="text" className={classes.group} >
            <Button className={classes.label} onClick={ props.topClick } >
                <span className={classes.count}>{ onCount() }</span>
                <MonitorIcon/>
            </Button>
            <Button className={classes.label} onClick={ props.bottomClick } >
                <span className={classes.count}>{ onCount() }</span>
                <DesktopIcon />
            </Button>
        </ButtonGroup>
    );
}

export default MonitorButtonStackLabel;
