import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

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

    return (
        <SmallSlider
            value={ props.item.value ? parseInt(props.item.value.targetSetpoint.value) : 70 } unit={"°"}
            min={60} max={90} step={1}
            change={ handleTargetSetpointChange }
        />
    );
}

