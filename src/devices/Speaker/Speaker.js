import React from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useConnectivity from 'endpoint-model/property/connectivity/useConnectivity'
import { IconCloudOff, IconDeviceSpeaker, IconDeviceSpeakerOff } from '@tabler/icons';

const Speaker = props => {

    const { connectivityBool: reachable } = useConnectivity(props.endpointId)
    const { powerStateBool: powerStateOn, toggle } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId).replace(" Speakers", "");
    const on = props.on || powerStateOn

    if (props.filterOff && !on) {
        return null
    }

    return (
        <Group direction="row" noWrap style={{ width: "100%"}} spacing={0}>
            <Group style={{ flexShrink: 0, width: "50%" }} noWrap>
                { !reachable ?
                    <ThemeIcon color="red" size="lg" variant={on ? "filled" : "light"} radius="md">
                        <IconCloudOff size={20} />
                    </ThemeIcon>                
                :
                    <ThemeIcon size="lg" variant={on ? "filled" : "default"} radius="md" onClick={toggle}>
                        { on ? <IconDeviceSpeaker size={20} /> :  <IconDeviceSpeakerOff size={20} /> }
                    </ThemeIcon>
                }
                <Text weight={400} lineClamp={1} size="lg">
                    {name}
                </Text>
            </Group>
            <VolumeSlider 
                disabled = {!reachable}
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
