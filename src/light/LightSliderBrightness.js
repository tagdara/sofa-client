import React from 'react';

import SofaAvatarSlider from '../SofaAvatarSlider';

export default function LightSliderBrightness(props) {

    function handleBrightnessChange(event) {
        props.directive(props.device.endpointId,'BrightnessController', 'SetBrightness', { "brightness" : event })
    }; 

    return (
        <SofaAvatarSlider   label={"Brightness"} 
            small={true} reverse={true} minWidth={64} smallText={true}
            value={props.deviceState.BrightnessController.brightness.value}
            min={0} max={100} step={10} change={handleBrightnessChange}
            disabled={!props.deviceState.PowerController.powerState.value}
        />
    );
}

