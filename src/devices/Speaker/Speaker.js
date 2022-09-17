import React from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import { Speaker as SpeakerIcon } from 'react-feather'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'

const Speaker = props => {

    const { powerStateBool: on, toggle } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId).replace(" Speakers", "");

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
            <VolumeSlider endpointId={props.endpointId} />
        </Group>
    );
}

export default Speaker
