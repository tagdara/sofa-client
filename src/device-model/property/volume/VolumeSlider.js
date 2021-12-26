import React from 'react';
import CardLineSlider from 'components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import { Volume2 } from 'react-feather';
import useVolume from 'device-model/property/volume/useVolume'
import usePowerState from 'device-model/property/powerState/usePowerState'

export default function VolumeSlider(props) {

    const { volume, setVolume } = useVolume(props.endpointId, props.value, props.directive)
    const { powerState } = usePowerState(props.endpointId)

    if (volume === undefined ) { return null }

    const disabled = props.disabled || (props.value === undefined && powerState === "OFF")

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            <ThemeIcon variant="light">
                <Volume2 size={16} />
            </ThemeIcon >
            <CardLineSlider label={"Volume"} 
                value={ volume } on={true}
                min={0} max={100} step={10} change={setVolume}
                disabled={ disabled }
            />
        </Group>
    );
}

