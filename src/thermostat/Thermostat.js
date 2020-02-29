import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from '../DataContext/DeviceProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ToggleAvatar from '../ToggleAvatar';
import Button from '@material-ui/core/Button';
import ToysIcon from '@material-ui/icons/Toys';

import GridItem from '../GridItem'
import SofaSlider from '../SofaSlider'

const useStyles = makeStyles({

    listItem: {
        padding: "0 0 16 24",
        width: '100%',
    },
    bottomListItem: {
        padding: "0 0 0 24",
        width: '100%',
        minHeight: 64,
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
    },
    list: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
});

export default function Thermostat(props) {
    
    const classes = useStyles();
    const { applyLayoutCard, applyBackPage } = useContext(LayoutContext);
    const { directive, getController} = useContext(DeviceContext);

    const [targetSetpoint, setTargetSetpoint] = useState(70);
    const [powerLevel, setPowerLevel] = useState(false)
    const [fanSetMode, setFanSetMode] = useState(false);
    //const device=deviceByEndpointId(props.device.endpointId)

    useEffect(() => {
        if (props.device.ThermostatController.hasOwnProperty('upperSetpoint')) {
            setTargetSetpoint([props.device.ThermostatController.lowerSetpoint.deepvalue, props.device.ThermostatController.upperSetpoint.deepvalue ])
        } else {
            setTargetSetpoint(props.device.ThermostatController.targetSetpoint.deepvalue)
        }
        if (props.device.hasOwnProperty('PowerLevelController')) {
            setPowerLevel(props.device.PowerLevelController.powerLevel.value)
        }
    }, [props.device]);


    function supportedModes() {
        try { return getController(props.device.endpointId, "ThermostatController").configuration.supportedModes }
        catch {}
        return []
    }


    function supportedRange() {
        try {
            return getController(props.device.endpointId, "ThermostatController").configuration.supportedRange
        }
        catch {}
        
        return [60,90]
    }
                    
    
    function tempColor(temp) {
        if (!temp) { return 'disabled' } 
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function handlePrePowerLevelChange(event) {
        setPowerLevel(event);
    }; 
    
    function handlePowerLevelChange(event) {
        directive(props.device.endpointId, "PowerLevelController", "SetPowerLevel", {"powerLevel": event})
    }; 

    function handlePreSetpointChange(event) {
        setTargetSetpoint(event);
    }; 
    
    function handleSetpointChange(event) {
        directive(props.device.endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": event, "scale": "FAHRENHEIT"}} )
    }; 

    function handleSetMode(event) {
        directive(props.device.endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": event }} )
    }; 
    
    function switchToHistory() {
        applyBackPage('ThermostatLayout',{})
        applyLayoutCard('ThermostatHistory', { 'device':props.device, 'days':7})
    }


    return ( 
        <GridItem>
            <List className={classes.list} >
                <ListItem>
                    <ToggleAvatar 
                        avatarState={ tempColor(props.device.TemperatureSensor.temperature.deepvalue) }
                        onClick={ () => switchToHistory()} >
                            {props.device.TemperatureSensor.temperature.deepvalue ? props.device.TemperatureSensor.temperature.deepvalue : '--'}
                    </ToggleAvatar>
                    <SofaSlider min={supportedRange()[0]} max={supportedRange()[1]} defaultValue={70} value={targetSetpoint} unit={"°"} name={props.device.friendlyName}
                                preChange={handlePreSetpointChange} change={handleSetpointChange} 
                                disabled={ props.device.ThermostatController.thermostatMode.value==='OFF' } />
                </ListItem>
                <ListItem className={classes.bottomListItem}>
                    <>
                        { powerLevel!==false &&
                            <>
                                { fanSetMode ?
                                    <>
                                        <Button size="small" className={classes.fanButton } onClick={ ()=> setFanSetMode(false)}>
                                            {props.device.ThermostatController.thermostatMode.value}
                                        </Button>
                                        <ListItemIcon><ToysIcon /></ListItemIcon>
                                        <SofaSlider value={powerLevel} step={10} unit={"%"} name={"Fan Speed"} padLeft={false} minWidth={100}
                                            preChange={handlePrePowerLevelChange} change={handlePowerLevelChange} />
                                    </>
                                :
                                    <Button size="small" className={classes.fanButton } onClick={ ()=> setFanSetMode(true)}>
                                        <ToysIcon />{powerLevel}%
                                    </Button>                        
                                }
                            </>
                        }
                    </>
                    <>
                        {!fanSetMode &&
                        <>
                            { supportedModes().map((mode) => (
                                <Button onClick={ (e) => handleSetMode(mode)} size="small" key = {mode+'m'} color={ props.device.ThermostatController.thermostatMode.value===mode ? "primary" : "default" } className={classes.button }>
                                {mode}
                                </Button>
                            ))}
                        </>
                        }
                    </>
                </ListItem>
            </List>
        </GridItem>
    );
}
