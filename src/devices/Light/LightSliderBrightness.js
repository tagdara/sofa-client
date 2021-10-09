import React from 'react';

import SofaAvatarSlider from 'components/SofaAvatarSlider';
import LightPropertyPlaceholder from 'devices/Light/LightPropertyPlaceholder';

export default function LightSliderBrightness(props) {

    function handleBrightnessChange(event) {
        props.directive(props.endpointId,'BrightnessController', 'SetBrightness', { "brightness" : event })
    }; 

    if (props.hide || !props.deviceState || !props.deviceState.BrightnessController ) {
        if (props.placeholder) {
            return <LightPropertyPlaceholder />
        }
        return null
    }

    const brightness = props.deviceState.BrightnessController.brightness.value
    const disabled = !props.deviceState.PowerController.powerState.value

    return (
        <SofaAvatarSlider label={"Brightness"} 
            small={true} reverse={true} minWidth={64} smallText={true}
            value={ brightness }
            min={0} max={100} step={10} change={handleBrightnessChange}
            disabled={ disabled }
        />
    );
}

