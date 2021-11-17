import React, { useEffect } from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider';

export default function TargetSetpoint(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'Alexa.ThermostatController', 'SetTargetTemperature', { "targetSetpoint" : { "value": 70, "scale": "FAHRENHEIT" }}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleTargetSetpointChange(event) {
        props.directive(props.device.endpointId, 'Alexa.ThermostatController', 'SetTargetTemperature', { "targetSetpoint" :  { "value": event, "scale": "FAHRENHEIT" }}, {}, props.item.instance)

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

