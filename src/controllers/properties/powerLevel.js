import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function PowerLevel(props) {
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.powerLevel.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(50)
            }
        }
    }, [props.interface])
    
    function handlePowerLevelChange(event) {
        props.interface.directive('SetPowerLevel', event)
    }; 

    return (
        <SmallSlider
            value={ parseInt(props.interface.powerLevel.value) } unit={"%"}
            min={0} max={100} step={10}
            change={ handlePowerLevelChange }
            disabled={props.device.hasOwnProperty('PowerController') ? !props.device.PowerController.powerState.value : false}
        />
    );
}

