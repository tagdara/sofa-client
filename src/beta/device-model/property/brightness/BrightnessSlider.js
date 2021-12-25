import React from 'react';
import CardLineSlider from 'beta/components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import { Sun } from 'react-feather';
import useBrightness from 'beta/device-model/property/brightness/useBrightness'
import usePowerState from 'beta/device-model/property/powerState/usePowerState'

export default function BrightnessSlider(props) {

    const { brightness, setBrightness } = useBrightness(props.endpointId, props.value, props.directive)
    const { powerState } = usePowerState(props.endpointId)

    if (brightness === undefined ) { return null }

    const disabled = props.disabled || (props.value === undefined && powerState === "OFF")

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            <ThemeIcon variant="light">
                <Sun size={16} />
            </ThemeIcon >
            <CardLineSlider label={"Brightness"} 
                value={ brightness } on={true}
                min={0} max={100} step={10} change={setBrightness}
                disabled={ disabled }
            />
        </Group>
    );
}

