import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

import CloudOffIcon from '@material-ui/icons/CloudOff';
import ClearIcon from '@material-ui/icons/Clear';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import LightbulbOutlineIcon from 'resources/LightbulbOutline';
import LightProperties from "devices/Light/LightProperties";
import SofaListItem from "components/SofaListItem";
import ItemBase from "components/ItemBase";

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
            <LightProperties    endpointId={props.endpointId} deviceState={lightState}
                                showAll={showAll} brightControl={props.brightControl} tempControl={props.tempControl} colorControl={props.colorControl}
                                onLevelControl={props.onLevelControl} remove={props.remove} />
        </ItemBase>
    )
}, deviceStatesAreEqual);

export default dataFilter(Light);

Light.defaultProps = {
    itemType: "card",
    nopaper: false,
    showAll: false,
    small: true,
    removing: false,
}
