import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';

import CloudOffIcon from '@material-ui/icons/CloudOff';
import ClearIcon from '@material-ui/icons/Clear';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import LightSliderBrightness from "devices/Light/LightSliderBrightness";
import LightSliderTemperature from "devices/Light/LightSliderTemperature";
import LightSliderColor from "devices/Light/LightSliderColor";
import LightSliderOnLevel from "devices/Light/LightSliderOnLevel";
import SofaListItem from "components/SofaListItem";
import CardBase from "components/CardBase";


const useStyles = makeStyles(theme => {
    return {        
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
        margin: 4,
        padding: 8,
    },
    lightLabel: {
        height: 48,
        maxWidth: "50%",
        flexGrow:1,
        '&:hover': {
            backgroundColor: theme.palette.background.hover,
        },
        borderRadius:4,
        padding: 8,
        boxSizing: "border-box",
        alignItems: "center",
        display: "flex",
    },
    controlPad: {
        paddingBottom: 8,
    },
    controlList: {
        paddingTop: 0,
        width: "100%",
    }
}
});

export default function Light(props) {
    
    const classes = useStyles();
    const [showAll, setShowAll] = useState(props.showAll)
    const expanded = showAll || props.brightControl || props.tempControl || props.colorControl
    
    function handlePowerChange(event) {
        console.log('powerchange',props.device.endpointId, event.target.checked ? 'TurnOn' : 'TurnOff')
        props.directive(props.device.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 
    
    function isReachable() {
        try {
            if (props.deviceState.hasOwnProperty('EndpointHealth')) {
                if (props.deviceState.EndpointHealth.connectivity.value.value==='OK') { return true }
                return false
            }
            console.log('no endpoint health', props.deviceState)
            return true
        } catch (e) {
            console.log('Error getting reachable state', e)
            return false
        }
    }
    
    // noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true} noPaper={false} button={false}

    return (
        <CardBase noPad={ props.small } highlight={props.highlight}>
        <SofaListItem   avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? "on" : "off" }
                        avatarBackground={false} 
                        avatarClick={() => setShowAll(!showAll) }
                        labelClick={() => setShowAll(!showAll) }
                        avatar={ isReachable() ?
                                <LightbulbOutlineIcon className={classes.iconSize} />
                            :
                                <CloudOffIcon className={classes.iconSize} />
                        }                
                        primary={ props.device.friendlyName } 
                        secondary={ isReachable() ? null : 'Off at switch' }
                        small={props.small} 
                        noPad={props.small}
                        highlight={ expanded }
                        secondaryActions={ 
                            <>
                                { ( isReachable() && !props.deleting ) &&
                                    <Switch color="primary" className={classes.lightSwitch} checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                                }
                                { props.deleting && 
                                <IconButton size="small" onClick={()=>props.remove(props.device)} ><ClearIcon /></IconButton>
                                }
                            </>
                        }
        />
            { expanded && 
                    <List className={classes.controlList}>
                        { !props.brightControl && !showAll ? null :
                            ( !props.deviceState.hasOwnProperty('BrightnessController') ?
                                <ListItem className={classes.placeholder} />
                            :
                                <LightSliderBrightness device={props.device} deviceState={props.deviceState} directive={props.directive} />
                            )
                        }
                        { !props.tempControl && !showAll ? null :
                            ( !props.deviceState.hasOwnProperty('ColorTemperatureController') ?
                                <ListItem className={classes.placeholder} />
                            :
                            <LightSliderTemperature device={props.device} deviceState={props.deviceState} directive={props.directive}/>
                            )
                        }
                        { !props.colorControl && !showAll ? null :
                            ( !props.deviceState.hasOwnProperty('ColorController') ?
                                <ListItem className={classes.placeholder} />
                            :
                                <LightSliderColor device={props.device} deviceState={props.deviceState} directive={props.directive}/>
                            )
                        }
                        { !showAll ? null :
                            ( !props.deviceState.hasOwnProperty('On Level') ?
                                <ListItem className={classes.placeholder} />
                            :
                                <LightSliderOnLevel device={props.device} deviceState={props.deviceState} directive={props.directive} />
                            )
                        }
                        { !props.remove ? null :
                            <SofaListItem primary={"Remove"} avatar={ <ClearIcon /> } avatarClick={() => props.remove(props.device.endpointId)} className={classes.iconSize} />
                        }
                        
                        <div className={classes.controlPad} />
                    </List>
                }
        </CardBase>
    )
}

Light.defaultProps = {
    nopaper: false,
    showAll: false,
    small: true,
    removing: false,
}
