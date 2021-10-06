import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';

import CloudOffIcon from '@material-ui/icons/CloudOff';
import ClearIcon from '@material-ui/icons/Clear';

import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'

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

const Light = React.memo(props => {

    const classes = useStyles();
    const [showAll, setShowAll] = useState(props.showAll)
    const expanded = showAll || props.brightControl || props.tempControl || props.colorControl
    const light = props.devices[props.endpointId]
    const lightState = props.deviceState[ props.endpointId ]
    const name = light ? light.friendlyName : "Unknown"

    useEffect(() => {
        props.addEndpointIds("id", props.endpointId, "Light"+props.endpointId)
        return function cleanup() {
            props.unregisterDevices("Light"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])    


    function handlePowerChange(event) {
        props.directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 
    
    function isReachable() {
        try {
            if (lightState.EndpointHealth.connectivity.value.value==='OK') {
                return true
            }
        }
        catch {}
        return false
    }

    function filtered(filter) {
        
        filter = filter ? filter.toUpperCase() : "TRUE"
        switch (filter) {
            case "ON":
                if (lightState && lightState.PowerController.powerState.value==='ON' && isReachable()) {
                    return false
                }
                break;
            case "OFF":
                if (!lightState || lightState.PowerController.powerState.value==='OFF' || !isReachable()) {
                    return false
                }
                break;
            default:
                return false     
        }
        return true
    }

    if (!lightState || filtered(props.filter)) { return null}

    return (
        <CardBase noPad={ props.small } highlight={props.highlight}>
        <SofaListItem   avatarState={ lightState.PowerController.powerState.value==='ON' ? "on" : "off" }
                        avatarBackground={false} 
                        avatarClick={() => setShowAll(!showAll) }
                        labelClick={() => setShowAll(!showAll) }
                        avatar={ isReachable() ?
                                <LightbulbOutlineIcon className={classes.iconSize} />
                            :
                                <CloudOffIcon className={classes.iconSize} />
                        }                
                        primary={ name } 
                        secondary={ isReachable() ? null : 'Off at switch' }
                        small={props.small} 
                        noPad={props.small}
                        highlight={ expanded }
                        secondaryActions={ 
                            <>
                                { ( isReachable() && !props.deleting ) &&
                                    <Switch color="primary" className={classes.lightSwitch} checked={lightState.PowerController.powerState.value==='ON'} 
                                            onChange={handlePowerChange} />
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
                            ( !lightState.hasOwnProperty('BrightnessController') ?
                                <ListItem className={classes.placeholder} />
                            :
                                <LightSliderBrightness device={light} deviceState={lightState} directive={props.directive} />
                            )
                        }
                        { !props.tempControl && !showAll ? null :
                            ( !lightState.hasOwnProperty('ColorTemperatureController') ?
                                <ListItem className={classes.placeholder} />
                            :
                            <LightSliderTemperature device={light} deviceState={lightState} directive={props.directive}/>
                            )
                        }
                        { !props.colorControl && !showAll ? null :
                            ( !lightState.hasOwnProperty('ColorController') ?
                                <ListItem className={classes.placeholder} />
                            :
                                <LightSliderColor device={light} deviceState={lightState} directive={props.directive}/>
                            )
                        }
                        { !showAll ? null :
                            ( !lightState.hasOwnProperty('On Level') ?
                                <ListItem className={classes.placeholder} />
                            :
                                <LightSliderOnLevel device={light} deviceState={lightState} directive={props.directive} />
                            )
                        }
                        { !props.remove ? null :
                            <SofaListItem primary={"Remove"} avatar={ <ClearIcon /> } avatarClick={() => props.remove(props.endpointId)} className={classes.iconSize} />
                        }
                        
                        <div className={classes.controlPad} />
                    </List>
                }
        </CardBase>
    )
}, deviceStatesAreEqual);

export default dataFilter(Light);

Light.defaultProps = {
    nopaper: false,
    showAll: false,
    small: true,
    removing: false,
}
