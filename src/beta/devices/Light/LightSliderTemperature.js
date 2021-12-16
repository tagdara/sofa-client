import React from 'react';

import CardLineSlider from 'beta/components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import { Thermometer } from 'react-feather';

const LightSliderTemperature = props => {

    function handleColorTemperatureChange(value) {
        props.directive(props.endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": value} )
    }; 

    if (!props.deviceState || !props.deviceState.ColorTemperatureController ) {
        return null
    }

    const colorTemperatureInKelvin = props.deviceState.ColorTemperatureController.colorTemperatureInKelvin.value
    const disabled = !props.deviceState.PowerController.powerState.value

    return (
        <Group noWrap>
            <ThemeIcon variant="light">
                <Thermometer size={16} />
            </ThemeIcon >
            <CardLineSlider label={"Temperature"} on={true}
                value={ colorTemperatureInKelvin }
                min={2000} max={7000} step={100}  change={ handleColorTemperatureChange }
                disabled={ disabled }
            />
        </Group>
    );
}

export default LightSliderTemperature;


