import React from 'react';
import CardLineSlider from 'components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import { Volume2 } from 'react-feather';
import useVolume from 'device-model/property/volume/useVolume'
import usePowerState from 'device-model/property/powerState/usePowerState'

export default function VolumeSlider(props) {

    const { volume, setVolume } = useVolume(props.endpointId, props.value, props.directive)
    const { powerStateBool } = usePowerState(props.endpointId)

    if (volume === undefined ) { return null }

    const disabled = props.disabled || ( props.value === undefined && !powerStateBool )
    const on = ( props.value === undefined && powerStateBool )

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            { props.icon &&
                <ThemeIcon variant="light">
                    <Volume2 size={16} />
                </ThemeIcon >
            }
            <CardLineSlider label={"Volume"} 
                value={ volume } 
                on={on}
                change={setVolume}
                disabled={ disabled }
                marks={props.marks}

                step={ props.step ? props.step : 10 }
            />
        </Group>
    );
}

