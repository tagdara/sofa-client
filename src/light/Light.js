import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import LightbulbOutlineIcon from '../LightbulbOutline';
import CloudOffIcon from '@material-ui/icons/CloudOff';
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
        maxHeight: 64,
        width: "100%",
    }
});

export default function Light(props) {
    
    const classes = useStyles();
    const [showAll, setShowAll] = useState(false)
    
    function handlePowerChange(event) {
        props.directive(props.device.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 
    
    function isReachable() {
        try {
            if (props.device.hasOwnProperty('EndpointHealth')) {
                if (props.device.EndpointHealth.connectivity.value.value==='OK') { return true }
                return false
            }
            console.log('no endpoint health', props.device)
            return true
        } catch (e) {
            console.log('Error getting reachable state', e)
            return false
        }
    }
    
    return (
        <GridItem nopaper={props.nopaper} xs={props.xs} thinmargin={props.thinmargin} >
            <ListItem className={classes.listItem} >
                { isReachable() ?
                    <ToggleAvatar noback={true} avatarState={props.device.PowerController.powerState.value==='ON' ? "on" : "off" } >
                        <LightbulbOutlineIcon className={classes.iconSize} />
                    </ToggleAvatar>
                :
                    <ToggleAvatar avatarState={ "off" } >
                        <CloudOffIcon className={classes.iconSize} />
                    </ToggleAvatar>
                }                
                <ListItemText onClick={() => setShowAll(!showAll) } primary={props.device.friendlyName} secondary={ isReachable() ? '': 'Off at switch' } />
                { isReachable() &&
                    <Switch color="primary" className={classes.lightSwitch} checked={props.device.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                }
            </ListItem>
            { !props.brightControl && !showAll ? null :
                ( !props.device.hasOwnProperty('BrightnessController') ?
                    <ListItem className={classes.placeholder} />
                :
                    <LightSliderBrightness device={props.device} directive={props.directive} />
                )
            }
            { !props.tempControl && !showAll ? null :
                ( !props.device.hasOwnProperty('ColorTemperatureController') ?
                    <ListItem className={classes.placeholder} />
                :
                <LightSliderTemperature device={props.device} directive={props.directive}/>
                )
            }
            { !props.colorControl && !showAll ? null :
                ( !props.device.hasOwnProperty('ColorController') ?
                    <ListItem className={classes.placeholder} />
                :
                    <LightSliderColor device={props.device} directive={props.directive}/>
                )
            }
        </GridItem>
    );
}

Light.defaultProps = {
    nopaper: false,
}
