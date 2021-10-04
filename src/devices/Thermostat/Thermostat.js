import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Collapse from '@material-ui/core/Collapse';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceContext } from 'DataContext/DeviceProvider';

import SofaAvatarSlider from 'components//SofaAvatarSlider'
import CardBase from 'components/CardBase'
import ModeLines from 'devices/Mode/ModeLines'
import SofaListItem from 'components/SofaListItem'
import ToggleAvatar from 'components/ToggleAvatar';


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
        minWidth: 36,
        padding: "4px 8px",
        backgroundColor: theme.palette.background.button,
        borderColor: "rgba(255,255,255, 0) !important",
        marginRight: 1,
        "&:hover" : {
            backgroundColor: theme.palette.background.hoverButton
        },
    },
    selectedButton: {
        minWidth: 36,
        padding: "4px 8px",
        backgroundColor: theme.palette.background.selectButton,
        color: theme.palette.primary.contrastText,
        borderColor: "rgba(255,255,255, 0) !important",
        marginRight: 1,
        "&:hover" : {
            backgroundColor: theme.palette.background.hoverSelectButton
        },

    },
    buttonGroup: {
        display: "flex",
        flexGrow: 1,
    },
    detail: {
        width: "100%",
    },
    setpoint: {
        fontSize: 16,
    }
    
    }
});

export default function Thermostat(props) {
    
    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const { directive, getController} = useContext(DeviceContext);

    const [targetSetpoint, setTargetSetpoint] = useState(70);
    const [powerLevel, setPowerLevel] = useState(false)
    const [showDetail, setShowDetail] = useState(false)

    useEffect(() => {
        if (props.deviceState) {
            if (props.deviceState.ThermostatController.hasOwnProperty('upperSetpoint')) {
                setTargetSetpoint([props.deviceState.ThermostatController.lowerSetpoint.deepvalue, props.device.ThermostatController.upperSetpoint.deepvalue ])
            } else {
                setTargetSetpoint(props.deviceState.ThermostatController.targetSetpoint.deepvalue)
            }
            if (props.deviceState.hasOwnProperty('PowerLevelController')) {
                setPowerLevel(props.deviceState.PowerLevelController.powerLevel.value)
            }
        }
    // eslint-disable-next-line 
    }, [props.deviceState]);
 
    function supportedModes() {
        try { return getController(props.device.endpointId, "ThermostatController").configuration.supportedModes }
        catch {}
        return []
    }

    //function supportedRange() {
        //needs to be applied to the button version but stubbed for now
    //    try {
    //        return getController(props.device.endpointId, "ThermostatController").configuration.supportedRange
    //    }
    //    catch {}
    //    
    //    return [60,90]
    //}
                    
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

    //function handlePreSetpointChange(event) {
    //    setTargetSetpoint(event);
    //}; 
    
    function handleSetpointChange(event) {
        directive(props.device.endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": event, "scale": "FAHRENHEIT"}} )
    }; 

    function handleSetMode(event) {
        directive(props.device.endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": event }} )
    }; 
    
    function switchToHistory() {
        selectPage('ThermostatLayout')
    }
    
    function showFanPowerLevel() {

        if (!props.deviceState.hasOwnProperty('PowerLevelController')) {
            return false
        }
        
        // This is for Dyson
        if (getController(props.device.endpointId, 'Fan Mode')) {
            if (props.deviceState['Fan Mode'].mode.value!=='FAN') {
                return false
            } 
        }
        return true
    }

    return ( 
        <CardBase>
                <SofaListItem   avatarState={ tempColor(props.deviceState.TemperatureSensor.temperature.deepvalue) }
                                onClick={ () => setShowDetail(!showDetail)}
                                avatar={ props.deviceState.TemperatureSensor.temperature.deepvalue ? props.deviceState.TemperatureSensor.temperature.deepvalue : '--'}
                                avatarClick={ () => switchToHistory()} 
                                primary={ props.device.friendlyName } 
                />
                <ListItem className={classes.bottomListItem}>
                    <>
                        <ButtonGroup className={classes.buttonGroup} size="small" variant="text" >
                            { supportedModes().map((mode) => (
                                <Button className={props.deviceState.ThermostatController.thermostatMode.value===mode ? classes.selectedButton : classes.modeButton  } onClick={ (e) => handleSetMode(mode)} size="small" key = {mode+'m'} >
                                {mode}
                                </Button>
                            ))}
                        </ButtonGroup>
                        { props.deviceState.ThermostatController.thermostatMode.value!=='OFF' &&
                            <ToggleAvatar small={true} onClick={() => setShowDetail(!showDetail) } reverse={true} 
                                avatarState={props.deviceState.ThermostatController.thermostatMode.value}>
                                {targetSetpoint}
                            </ToggleAvatar>
                        }
                    </>
                </ListItem>
                <Collapse in={showDetail} className={classes.detail}>
                    <ListItem>
                        <ListItemText primary={'Heat Set point'} />
                        <ButtonGroup size="small" variant="text"  >
                            <Button onClick={ () => handleSetpointChange(targetSetpoint-1) }><ExpandMoreIcon /></Button>
                            <Button className={classes.setpoint} >{targetSetpoint}</Button>
                            <Button  onClick={ () => handleSetpointChange(targetSetpoint+1) }><ExpandLessIcon /></Button>
                        </ButtonGroup>
                    </ListItem> 
                    { showFanPowerLevel() &&
                        <ListItem>
                            <ListItemText primary={"Fan"} />
                            <SofaAvatarSlider  small={true} reverse={true} minWidth={160} 
                                                value={powerLevel} step={10} noPad={true}
                                                preChange={handlePrePowerLevelChange} change={handlePowerLevelChange} />
                        </ListItem> 
                    }

                    <ModeLines directive={directive} device={props.device} deviceState={props.deviceState}  />
                </Collapse>
        </CardBase>
    );
}
