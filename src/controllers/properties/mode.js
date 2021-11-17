import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Mode = (props) => {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'ModeController', 'SetMode', {"mode" : props.interface.configuration.supportedModes[0].value}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleModeChange(event) {
        //props.interface.directive('SetMode', event.target.value, {}, props.instance)
        props.directive(props.device.endpointId, 'ModeController', 'SetMode', {"mode" : event.target.value}, {}, props.item.instance)
    }; 

    if (props.compact) {
        if (props.item.value!==undefined) {
            return props.item.value.mode.split('.')[1]
        }
        return ""
    }

    function getModeName(mode) {
        try {
            for (var n = 0; n < mode.modeResources.friendlyNames.length; n++) {
                if (mode.modeResources.friendlyNames[n]["@type"] === "text") {
                    var name = mode.modeResources.friendlyNames[n].value.text
                    return name
                }
            }
        }
        catch {}
        return mode.value.split('.')[1]
    }

    
    return (
        <Select value={props.item.value!==undefined ? props.item.value.mode : ""} onChange={handleModeChange} size="small" >
            { props.interface.configuration.supportedModes.map( mode => 
                <MenuItem key={mode.value} value={mode.value}>{ getModeName(mode) }</MenuItem>
            )}
        </Select>
    );

}

export default Mode