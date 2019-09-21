import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function TargetSetPoint(props) {
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.targetSetPoint.deepvalue()===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(70)
            }
        }
    }, [props.interface])
    
    function handleTargetSetPointChange(event) {
        props.interface.directive('SetTargetSetPoint', { "targetSetPoint" : event })
    }; 

    return (
        <SmallSlider
            value={ props.interface.targetSetPoint.deepvalue() } unit={"%"}
            min={60} max={90} step={1}
            change={ handleTargetSetPointChange }
            disabled={!props.device.ThermostatController.targetSetPoint.deepvalue()}
        />
    );
}

