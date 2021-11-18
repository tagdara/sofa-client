import React, { useState, useEffect } from 'react';
import CardLineSlider from 'components/CardLineSlider';
import TargetSetpointAvatar from 'controllers/ThermostatController/targetSetpointAvatar';

export default function TargetSetpoint(props) {

    const [ displayValue, setDisplayValue ] = useState( valueOrDefault())

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'Alexa.ThermostatController', 'SetTargetTemperature', { "targetSetpoint" : { "value": 70, "scale": "FAHRENHEIT" }}, {}, props.item.instance)
        }
        setDisplayValue(valueOrDefault())
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleTargetSetpointChange(newValue) {
        props.directive(props.device.endpointId, 'Alexa.ThermostatController', 'SetTargetTemperature', { "targetSetpoint" :  { "value": newValue, "scale": "FAHRENHEIT" }}, {}, props.item.instance)

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
        <>
            <CardLineSlider min={60} max={90} small={true}  value={ valueOrDefault() } slide={setDisplayValue} set={ handleTargetSetpointChange } />
            <TargetSetpointAvatar size="small" targetSetpoint={ displayValue } />
        </>
    );
}

