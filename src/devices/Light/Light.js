import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

import CloudOffIcon from '@mui/icons-material/CloudOff';
import ClearIcon from '@mui/icons-material/Clear';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';
import LightProperties from "devices/Light/LightProperties";
import ItemBase from "components/ItemBase";

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { deviceByEndpointId, isReachable, register, unregister } from 'store/deviceHelpers'

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

const useStyles = makeStyles(theme => {
    return {        
        iconSize: {
            height: 24,
            width: 24,
        },
        lightSwitch: {
            marginLeft: 8,
        },
    }
});

const Light = props => {

    const classes = useStyles();
    const [showAll, setShowAll] = useState(props.showAll)
    //const expanded = showAll || props.brightControl || props.tempControl || props.colorControl
    const light = deviceByEndpointId(props.endpointId)
    const lightState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, "Light"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Light"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    function handlePowerChange(event) {
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    const name = light ? light.friendlyName : "Unknown"
    const reachable = isReachable(lightState)
    const on = lightState && lightState.PowerController.powerState.value === 'ON'

    function filtered(filter) {
        
        filter = filter ? filter.toUpperCase() : "TRUE"
        switch (filter) {
            case "ON":
                if (on && reachable) {
                    return false
                }
                break;
            case "OFF":
                if (!lightState || !on || !reachable) {
                    return false
                }
                break;
            default:
                return false     
        }
        return true
    }

    if (!lightState || filtered(props.filter)) { 
        return null 
    }

    return (
        <ItemBase itemType={ props.itemType } small={ props.small} >
            <CardLine onClick={ () => setShowAll(!showAll)}>
                <CardLineIcon color={on ? "primary" : undefined } onClick={stopEventPropagation}  >
                    { reachable ? <LightbulbOutlineIcon className={classes.iconSize} />
                                : <CloudOffIcon className={classes.iconSize} /> }            
                </CardLineIcon>
                <CardLineText primary={name} secondary={reachable ? null : 'Off at switch' }/>
                { (reachable && !props.remove ) &&
                    <Switch color="primary" className={classes.lightSwitch} 
                            checked={lightState.PowerController.powerState.value==='ON'} 
                            onChange={handlePowerChange} onClick={stopEventPropagation} />
                }
                { props.remove && 
                    <IconButton size="small" onClick={()=>props.remove(props.device)} >
                        <ClearIcon />
                    </IconButton>
                }
            </CardLine>            
            <LightProperties    endpointId={props.endpointId} deviceState={lightState}
                                showAll={showAll} brightControl={props.brightControl} tempControl={props.tempControl} colorControl={props.colorControl}
                                onLevelControl={props.onLevelControl} />
        </ItemBase>
    )
}

export default Light;

Light.defaultProps = {
    itemType: "card",
    nopaper: false,
    showAll: false,
    small: true,
    removing: false,
}
