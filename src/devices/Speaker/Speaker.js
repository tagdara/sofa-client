import React from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import { Speaker as SpeakerIcon } from 'react-feather'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'

const Speaker = props => {

    const { powerStateBool: powerStateOn, toggle } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId).replace(" Speakers", "");
    const on = props.on || powerStateOn

    if (props.filterOff && !on) {
        return null
    }

    return (
        <Group direction="row" noWrap style={{ width: "100%"}} spacing={0}>
            <Group style={{ flexShrink: 0, width: "50%" }} noWrap>
                <ThemeIcon size="lg" variant={on ? "filled" : "light"} radius="md" onClick={toggle}>
                    <SpeakerIcon size={20} />
                </ThemeIcon>
                <Text weight={400} lineClamp={1} size="lg">
                    {name}
                </Text>
            </Group>
            <VolumeSlider 
                endpointId={props.endpointId} 
                on={on} 
                step={ props.volumeStep } 
                marks={ props.volumeMarks } 
                hideLabels={ props.noVolumeMarkLabels }
            />
        </Group>
    );
}

export default Speaker
