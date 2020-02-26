import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function TargetSetpoint(props) {
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.targetSetpoint.deepvalue()===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(70)
            }
        }
    }, [props.interface])
    
    function handleTargetSetpointChange(event) {
        props.interface.directive('SetTargetSetpoint', { "targetSetpoint" : event })
    }; 

    return (
        <SmallSlider
            value={ props.interface.targetSetpoint.deepvalue() ? parseInt(props.interface.targetSetpoint.deepvalue()) : 70 } unit={"°"}
            min={60} max={90} step={1}
            change={ handleTargetSetpointChange }
        />
    );
}

