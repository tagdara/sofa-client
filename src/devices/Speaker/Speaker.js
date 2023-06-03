import React from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useConnectivity from 'endpoint-model/property/connectivity/useConnectivity'
import { IconDeviceSpeaker, IconDeviceSpeakerOff } from '@tabler/icons';

const Speaker = props => {

    const { connectivityBool: reachable } = useConnectivity(props.endpointId)
    const { powerStateBool: powerStateOn, toggle } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId).replace(" Speakers", "");
    const on = props.on || powerStateOn

    if (props.filterOff && !on) {
        return null
    }

    return (
        <Group direction="row" noWrap style={{ padding: "4px 0", width: "100%"}} >
            <Group style={{ flexShrink: 0, width: "50%" }} noWrap>
                { !reachable ?
                    <ThemeIcon size="lg" variant={"subtle"} radius="md">
                        <IconDeviceSpeakerOff 
                            size={20} 
                            style={{ 
                                color:  on ? undefined : "gray" 
                            }}
                        />
                    </ThemeIcon>                
                :
                    <ThemeIcon size="lg" variant={on ? "light" : "default"} radius="md" onClick={toggle}>
                        <IconDeviceSpeaker 
                            size={20} 
                            style={{ 
                                color:  on ? undefined : "gray" 
                            }}
                        />
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
