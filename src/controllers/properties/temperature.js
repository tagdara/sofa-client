import React, { useEffect } from 'react';
import SofaAvatarSlider from '../../SofaAvatarSlider';

export default function Temperature(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'TemperatureSensor', 'SetTemperature', { "temperature" : { "value":70, "scale": "FAHRENHEIT" } }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function valueOrDefault() {
        var val=70
        try {
            if (props.item.value.hasOwnProperty('temperature')) {
                val=parseInt(props.item.value.temperature.value)
                console.log('parse temp',val, props.item.value)
            }
        } 
        catch {}
        return val
    }
    
    function handleTargetSetpointChange(event) {
        props.directive(props.device.endpointId, 'TemperatureSensor', 'SetTemperature', { "temperature" : { "value":parseInt(event), "scale": "FAHRENHEIT" }}, {}, props.item.instance)

    }; 

    return (
        <SofaAvatarSlider small={true} reverse={true} minWidth={64} value={ valueOrDefault() } change={ handleTargetSetpointChange } />
    );
}

