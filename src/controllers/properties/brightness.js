import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function Brightness(props) {
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.brightness.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(50)
            }
        }
    }, [props.interface])
    
    function handleBrightnessChange(event) {
        props.interface.directive('SetBrightness', { "brightness" : event })
    }; 

    return (
        <SmallSlider
            value={ props.interface.brightness.value } unit={"%"}
            min={0} max={100} step={10}
            change={ handleBrightnessChange }
            disabled={!props.device.PowerController.powerState.value}
        />
    );
}

