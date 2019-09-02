import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from '../layout/NewLayoutProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ToggleAvatar from '../ToggleAvatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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

function Thermostat(props) {
    
    const classes = useStyles();
    const [targetSetpoint, setTargetSetpoint] = useState(70);
    const [powerLevel, setPowerLevel] = useState(false)
    const [fanSetMode, setFanSetMode] = useState(false);

    useEffect(() => {
        if (props.device.ThermostatController.hasOwnProperty('upperSetpoint')) {
            setTargetSetpoint([props.device.ThermostatController.lowerSetpoint.value.value, props.device.ThermostatController.upperSetpoint.value.value ])
        } else {
            setTargetSetpoint(props.device.ThermostatController.targetSetpoint.value.value)
        }
        if (props.device.hasOwnProperty('PowerLevelController')) {
            setPowerLevel(props.device.PowerLevelController.powerLevel.value)
        }
    }, [props.device]);


    function supportedModes() {

        if (props.device.ThermostatController.hasOwnProperty('configuration')) {
            if (props.device.ThermostatController.configuration.hasOwnProperty('supportedModes')) {
                return props.device.ThermostatController.configuration.supportedModes
            }
        }
        return []
    }

    function supportedRange() {

        if (props.device.ThermostatController.hasOwnProperty('configuration')) {
            if (props.device.ThermostatController.configuration.hasOwnProperty('supportedRange')) {
                return props.device.ThermostatController.configuration.supportedRange
            }
        }
        return [60,90]
    }
                    
    
    function tempColor(temp) {
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function handlePrePowerLevelChange(event) {
        setPowerLevel(event);
    }; 
    
    function handlePowerLevelChange(event) {
        props.device.PowerLevelController.directive("SetPowerLevel", {"powerLevel": event})
    }; 

    function handlePreSetpointChange(event) {
        setTargetSetpoint(event);
    }; 
    
    function handleSetpointChange(event) {
        props.device.ThermostatController.directive("SetTargetTemperature", { "targetSetpoint": { "value": event, "scale": "FAHRENHEIT"}} )
    }; 

    function handleSetMode(event) {
        props.device.ThermostatController.directive("SetThermostatMode",  {"thermostatMode" : { "value": event }} )
    }; 
    
    function switchToHistory() {
        props.applyBackPage('ThermostatLayout',{})
        props.applyLayoutCard('ThermostatHistory', { 'device':props.device, 'days':7})
    }


    return (
        <GridItem>
            <List className={classes.list} >
            <ListItem>
                <ToggleAvatar avatarState={ tempColor(props.device.TemperatureSensor.temperature.value.value) } onClick={ () => switchToHistory()} >{props.device.TemperatureSensor.temperature.value.value}</ToggleAvatar>
                <SofaSlider min={supportedRange()[0]} max={supportedRange()[1]} defaultValue={70} value={targetSetpoint} unit={"°"} name={props.name}
                            preChange={handlePreSetpointChange} change={handleSetpointChange} 
                            disabled={ props.device.ThermostatController.thermostatMode.value=='OFF' } />
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
                            <Button onClick={ (e) => handleSetMode(mode)} size="small" key = {mode+'m'} color={ props.device.ThermostatController.thermostatMode.value==mode ? "primary" : "default" } className={classes.button }>
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

export default withLayout(Thermostat);
