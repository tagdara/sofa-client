import React from 'react';

import SofaAvatarSlider from '../SofaAvatarSlider';

export default function LightSliderTemperature(props) {

    function handleColorTemperatureChange(value) {
        props.directive(props.device.endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": value} )
    }; 

    return (
        <SofaAvatarSlider   label={"Temperature"} 
            small={true} reverse={true} minWidth={64} smallText={true}
            value={props.deviceState.ColorTemperatureController.colorTemperatureInKelvin.value}
            min={2000} max={7000} step={100} change={handleColorTemperatureChange}
            disabled={!props.deviceState.PowerController.powerState.value}
        />
    );

}


