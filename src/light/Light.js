import React from "react";
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ToggleAvatar from '../ToggleAvatar';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import LightbulbOutlineIcon from '../LightbulbOutline';

import SofaSlider from "../SofaSlider"
import LightSliderBrightness from "./LightSliderBrightness"
import LightSliderTemperature from "./LightSliderTemperature"
import LightSliderColor from "./LightSliderColor"
import GridItem from "../GridItem"

const useStyles = makeStyles({
 
    iconSize: {
        height: 24,
        width: 24,
    },
    stack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    tile: {
        display: "flex",
        flexGrow: 1,
        height: 90,
        paddingRight: 8,
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
    },
    nostack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        boxSizing: "border-box",
        marginRight: 8,
    },
    lightSwitch: {
        marginLeft: 8,
    },
    lightbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    placeholder: {
        height: 57,
        width: "100%",
    },
    listItem: {
        padding: "8 24px",
    }
});

export default function Light(props) {
    
    const classes = useStyles();
    const [showAll, setShowAll] = useState(false)
    
    function handlePowerChange(event){
        if (event.target.checked) {
            props.sendAlexaCommand(props.name, props.device.endpointId, "PowerController", "TurnOn")
        } else {
            props.sendAlexaCommand(props.name, props.device.endpointId, "PowerController", "TurnOff")
        }
    }; 
    
    return (
        <GridItem nopaper={false} >
            <ListItem>
                <ToggleAvatar avatarState={props.deviceProperties.powerState=='ON' ? "on" : "off" } >
                    <LightbulbOutlineIcon className={classes.iconSize} />
                </ToggleAvatar>
                <ListItemText onClick={() => setShowAll(!showAll) }>{props.name}</ListItemText>
                <Switch color="primary" className={classes.lightSwitch} checked={props.deviceProperties.powerState=='ON'} onChange={handlePowerChange} />
            </ListItem>
            { !props.brightControl && !showAll ? null :
                ( props.deviceProperties.brightness===undefined ?
                    <ListItem className={classes.placeholder} />
                :
                    <LightSliderBrightness sendAlexaCommand={props.sendAlexaCommand} name={props.name} endpointId={props.device.endpointId} powerState={props.deviceProperties.powerState=='ON'} brightness={props.deviceProperties.brightness}/>
                )
            }
            { !props.tempControl && !showAll ? null :
                ( props.deviceProperties.colorTemperatureInKelvin===undefined ?
                    <ListItem className={classes.placeholder} />
                :
                <LightSliderTemperature sendAlexaCommand={props.sendAlexaCommand} name={props.name} endpointId={props.device.endpointId} powerState={props.deviceProperties.powerState=='ON'} colorTemperatureInKelvin={props.deviceProperties.colorTemperatureInKelvin}/>
                )
            }
            { !props.colorControl && !showAll ? null :
                ( props.deviceProperties.color===undefined ?
                    <ListItem className={classes.placeholder} />
                :
                    <LightSliderColor sendAlexaCommand={props.sendAlexaCommand} name={props.name} endpointId={props.device.endpointId} brightness={props.deviceProperties.brightness} color={props.deviceProperties.color}/>
                )
            }
        </GridItem>
    );
}


