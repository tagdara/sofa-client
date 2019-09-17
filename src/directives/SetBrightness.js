import React from 'react';
import SmallSlider from '../SmallSlider';

export default function SetBrightness(props) {

    function handleBrightnessChange(event) {
        props.interface.directive('SetBrightness', { "brightness" : event })
    }; 

    return (
        <SmallSlider
            value={props.interface.brightness.value}
            min={0} max={100} step={10}
            change={handleBrightnessChange}
            disabled={!props.device.PowerController.powerState.value}
        />
    );
}

