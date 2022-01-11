import React from 'react';
import CardLineSlider from 'components/CardLineSlider';
import { Group } from '@mantine/core'
import useBrightness from 'device-model/property/brightness/useBrightness'
import usePowerState from 'device-model/property/powerState/usePowerState'

export default function BrightnessSlider(props) {

    const { brightness, setBrightness } = useBrightness(props.endpointId, props.value, props.directive)
    const { powerState } = usePowerState(props.endpointId)

    if (brightness === undefined ) { return null }

    const disabled = props.disabled || (props.value === undefined && powerState === "OFF")

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            <CardLineSlider label={"Brightness"} 
                value={ brightness } on={true}
                min={0} max={100} step={10} change={setBrightness}
                disabled={ disabled }
            />
        </Group>
    );
}

