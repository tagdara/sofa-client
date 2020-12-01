import React, { useEffect } from 'react';
import SofaAvatarSlider from '../../SofaAvatarSlider';

export default function TargetSetpoint(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'ThermostatController', 'SetTargetSetpoint', { "targetSetpoint" : 70 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleTargetSetpointChange(event) {
        props.directive(props.device.endpointId, 'ThermostatController', 'SetTargetSetpoint', { "targetSetpoint" : event }, {}, props.item.instance)

    }; 
    
    function valueOrDefault() {
        var val=70
        try {
            val=parseInt(props.item.value.targetSetpoint.value)
        } 
        catch {}
        return val
    }
    
    if (props.compact) {
        return valueOrDefault() + "°"
    }

    return (
        <SofaAvatarSlider avatarUnit={"°"} min={60} max={90} small={true} reverse={true} minWidth={64} value={ valueOrDefault()  } change={ handleTargetSetpointChange } />
    );
}

