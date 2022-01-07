import React from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import { Speaker as SpeakerIcon } from 'react-feather'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import VolumeSlider from 'device-model/property/volume/VolumeSlider'
import usePowerState from 'device-model/property/powerState/usePowerState'

const Speaker = props => {

    const { powerStateBool: on, toggle } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId).replace(" Speakers", "");

    if (props.filterOff && !on) {
        return null
    }

    return (
        <Group direction="row" noWrap grow>
            <Group style={{ width: "40%"}} noWrap>
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
