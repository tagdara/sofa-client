import React from 'react';
import CardLineSlider from 'beta/components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import { Sun } from 'react-feather';

export default function LightSliderBrightness(props) {

    function handleBrightnessChange(event) {
        props.directive(props.endpointId,'BrightnessController', 'SetBrightness', { "brightness" : event })
    }; 

    if (!props.deviceState || !props.deviceState.BrightnessController ) {
        return null
    }

    const brightness = props.deviceState.BrightnessController.brightness.value
    const disabled = !props.deviceState.PowerController.powerState.value

    return (
        <Group noWrap>
            <ThemeIcon variant="light">
                <Sun size={16} />
            </ThemeIcon >
            <CardLineSlider label={"Brightness"} 
                value={ brightness } on={true}
                min={0} max={100} step={10} change={handleBrightnessChange}
                disabled={ disabled }
            />
        </Group>
    );
}

