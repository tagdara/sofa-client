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
        if (props.deviceProperties.hasOwnProperty('upperSetpoint')) {
            console.log('Setpoint',[props.deviceProperties.lowerSetpoint.value, props.deviceProperties.upperSetpoint.value ])
            setTargetSetpoint([props.deviceProperties.lowerSetpoint.value, props.deviceProperties.upperSetpoint.value ])
        } else {
            setTargetSetpoint(props.deviceProperties.targetSetpoint.value)
        }
        if (props.deviceProperties.hasOwnProperty('powerLevel')) {
            setPowerLevel(props.deviceProperties.powerLevel)
        }
    }, [props.deviceProperties]);


    function supportedModes() {
        for (var i = 0; i < props.device.capabilities.length; i++) {
            if (props.device.capabilities[i]['interface']=='Alexa.ThermostatController') {
                if (props.device.capabilities[i].hasOwnProperty('configuration')) {
                    if (props.device.capabilities[i]['configuration'].hasOwnProperty('supportedModes')) {
                        return props.device.capabilities[i]['configuration']['supportedModes']
                    }
                }
            }
        }
        return []
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
        props.sendAlexaCommand(props.name, props.device.endpointId, "PowerLevelController", "SetPowerLevel", {"powerLevel": event})
    }; 

    function handlePreSetpointChange(event) {
        setTargetSetpoint(event);
    }; 
    
    function handleSetpointChange(event) {
        props.sendAlexaCommand(props.name, props.device.endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": event, "scale": "FAHRENHEIT"}} )
    }; 

    function handleSetMode(event) {
        props.sendAlexaCommand(props.name, props.device.endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": event }} )
    }; 
    
    function switchToHistory() {
        props.applyBackPage('ThermostatLayout',{})
        props.applyLayoutCard('ThermostatHistory', { 'device':props.device, 'days':7})
    }


    return (
        <GridItem>
            { props.deviceProperties.hasOwnProperty('temperature') &&
            <List className={classes.list} >
            <ListItem>
                <ToggleAvatar avatarState={ tempColor(props.deviceProperties.temperature.value) } onClick={ () => switchToHistory()} >{props.deviceProperties.temperature.value}</ToggleAvatar>
                <SofaSlider min={60} max={90} defaultValue={70} value={targetSetpoint} unit={"°"} name={props.name}
                            preChange={handlePreSetpointChange} change={handleSetpointChange} 
                            disabled={ props.deviceProperties.thermostatMode=='OFF' } />
            </ListItem>
            <ListItem className={classes.bottomListItem}>
                <>
                    { powerLevel!==false &&
                        <>
                            { fanSetMode ?
                                <>
                                    <Button size="small" className={classes.fanButton } onClick={ ()=> setFanSetMode(false)}>
                                        {props.deviceProperties.thermostatMode}
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
                            <Button onClick={ (e) => handleSetMode(mode)} size="small" key = {mode+'m'} color={ props.deviceProperties.thermostatMode==mode ? "primary" : "default" } className={classes.button }>
                            {mode}
                            </Button>
                        ))}
                    </>
                    }
                </>
            </ListItem>
            </List>
            }
        </GridItem>
    );
}

export default withLayout(Thermostat);
