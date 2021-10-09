import React from 'react';

import SofaAvatarSlider from 'components/SofaAvatarSlider';
import LightPropertyPlaceholder from 'devices/Light/LightPropertyPlaceholder';

const LightSliderTemperature = props => {

    function handleColorTemperatureChange(value) {
        props.directive(props.endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": value} )
    }; 

    if (props.hide || !props.deviceState || !props.deviceState.ColorTemperatureController ) {
        if (props.placeholder) {
            return <LightPropertyPlaceholder />
        }
        return null
    }

    const colorTemperatureInKelvin = props.deviceState.ColorTemperatureController.colorTemperatureInKelvin.value
    const disabled = !props.deviceState.PowerController.powerState.value

    return (
        <SofaAvatarSlider   label={"Temperature"} 
            small={true} reverse={true} minWidth={64} smallText={true}
            value={ colorTemperatureInKelvin }
            min={2000} max={7000} step={100} change={ handleColorTemperatureChange }
            disabled={ disabled }
        />
    );
}

export default LightSliderTemperature;


