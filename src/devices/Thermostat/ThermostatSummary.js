import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { LayoutContext } from 'layout/LayoutProvider';
import { DataContext } from 'DataContext/DataProvider';

const useStyles = makeStyles(theme => {
    return {        
        cool: {
            color: "#00796B",
            borderColor: "#00796B",
            '&:hover': {
                backgroundColor: "#B2DFDB",
                borderColor: "#00796B",
            }
        },
        mid: {
            color: "#558B2F",
            borderColor: "#558B2F",
            '&:hover': {
                backgroundColor: "#DCEDC8",
                borderColor: "#558B2F",
            }
                
        },
        hot: {
            color: "#E65100",
            borderColor: "#E65100",
            '&:hover': {
                backgroundColor: "#FFE0B2",
                borderColor: "#E65100",
            }
        },
        disabled: {
            width: 96,
            color: "#444",
            borderColor: "#444",
            '&:hover': {
                backgroundColor: "#666",
                borderColor: "#444",
            }
        },
        count: {
            fontSize: 16,
        }
    }
});

export default function ThermostatSummary(props) { 
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStateByFriendlyName } = useContext(DataContext);
    const classes = useStyles();

    const [device, setDevice]=useState(undefined)
    
    useEffect(() => {
        setDevice(deviceStateByFriendlyName('Main Thermostat'))
    }, [ setDevice, deviceStateByFriendlyName ] )
    
    function tempColor(temp) {
        if (temp>=74) { return classes.hot }
        if (temp<70) { return classes.cool }
        return classes.mid;
    }
    
    return ( 
        device ?
            <IconButton className={device.TemperatureSensor.temperature.value ? tempColor(device.TemperatureSensor.temperature.deepvalue) : classes.disabled } onClick={ () => applyLayoutCard('ThermostatLayout') }>
                <Typography className={classes.count}>
                {device.TemperatureSensor.temperature.value ? device.TemperatureSensor.temperature.deepvalue : '--'}&deg;
                </Typography>
            </IconButton>
        : null
    );
}

