import React from 'react';
import {  Group, Stack, Text } from '@mantine/core'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateAvatar from 'endpoint-model/property/powerState/PowerStateAvatar'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import TelevisionDetailLine from 'devices/Television/TelevisionDetailLine'
import usePullUp from 'layout/pullup/usePullUp'
import TelevisionPullUp from 'devices/Television/TelevisionPullUp'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import useMode from 'endpoint-model/property/mode/useMode'

import { IconDeviceTv } from '@tabler/icons';

const Television = props => {
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { showPullUp } = usePullUp(name)
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const { modeLabel: audioOutput } = useMode(props.endpointId, "Audio.Output")

    const volumePresets = [10, 20, 30, 40, 50];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    return (
        <>
            <Stack spacing="xl">
                <Group spacing="xl">
                    <PowerStateAvatar 
                        endpointId={ props.endpointId } 
                        icon={ on ?
                            <IconDeviceTv size={24}  />  
                            :
                            <IconDeviceTv size={24} /> 
                            } 
                        />
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}  onClick={showPullUp}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            {name}
                        </Text>
                        { on && <TelevisionDetailLine endpointId={props.endpointId} matrix={props.matrix} />  }
                    </Stack>
                </Group>
                { ( on && audioOutput === "TV" ) &&
                    <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
                }
            </Stack>
        
            <TelevisionPullUp matrix={props.matrix} endpointId={props.endpointId} name={name} />
        </>
    );
}


export default Television;
