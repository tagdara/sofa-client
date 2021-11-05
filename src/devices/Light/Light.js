import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

import CloudOffIcon from '@material-ui/icons/CloudOff';
import ClearIcon from '@material-ui/icons/Clear';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';
import LightProperties from "devices/Light/LightProperties";
import SofaListItem from "components/SofaListItem";
import ItemBase from "components/ItemBase";

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

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
    const expanded = showAll || props.brightControl || props.tempControl || props.colorControl
    const light = useDeviceStore( state => state.devices[props.endpointId] )
    const lightState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = light ? light.friendlyName : "Unknown"

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

    if (!lightState || filtered(props.filter)) { 
        // console.log('filters', lightState, filtered(props.filter)) ; 
        return null 
    }

    return (
        <ItemBase itemType={ props.itemType } small={ props.small} >
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
                                    { ( isReachable() && !props.remove ) &&
                                        <Switch color="primary" className={classes.lightSwitch} checked={lightState.PowerController.powerState.value==='ON'} 
                                                onChange={handlePowerChange} />
                                    }
                                    { props.remove && 
                                        <IconButton size="small" onClick={()=>props.remove(props.device)} ><ClearIcon /></IconButton>
                                    }
                                </>
                            }
            />
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
