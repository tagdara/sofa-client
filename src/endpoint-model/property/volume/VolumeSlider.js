import React from 'react';
import CardLineSlider from 'layout/components/CardLineSlider';
import { Group, Text, ThemeIcon } from '@mantine/core'
import useVolume from 'endpoint-model/property/volume/useVolume'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import { IconVolume2 } from '@tabler/icons';

export default function VolumeSlider(props) {

    const { volume, setVolume } = useVolume(props.endpointId, props.value, props.directive)
    const { powerStateBool } = usePowerState(props.endpointId)

    if (volume === undefined ) { return null }

    const disabled = props.disabled || ( props.value === undefined && !powerStateBool )
    const on = ( props.value !== undefined || powerStateBool || props.on)

    return (
        <Group noWrap position="apart" style={{ width: "100%", flexGrow: 1}}>
            <Group noWrap>
            { props.icon &&
                <ThemeIcon variant="light">
                    <IconVolume2 size={16} />
                </ThemeIcon >
            }
            { props.label &&
                <Text>{props.label}</Text>
            }
            </Group>
            <CardLineSlider label={"Volume"} 
                value={ volume } 
                on={on}
                change={setVolume}
                disabled={ disabled }
                marks={props.marks}
                hideLabels={props.hideLabels}
                step={ props.step ? props.step : 10 }
            />
        </Group>
    );
}

