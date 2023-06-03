import React from 'react';
import { Group, Stack, Text } from '@mantine/core'

import { endpointIdByFriendlyName, friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PowerStateAvatar from 'endpoint-model/property/powerState/PowerStateAvatar'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import ReceiverDetailLine from 'devices/Receiver/ReceiverDetailLine'
import usePullUp from 'layout/pullup/usePullUp'
import ReceiverPullUp from 'devices/Receiver/ReceiverPullUp'

import { IconDeviceSpeaker } from '@tabler/icons';


const Receiver = props => {

    const zone2 = endpointIdByFriendlyName("Receiver Zone 2")
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const { powerStateBool: zone2On } = usePowerState(zone2)
    const { showPullUp } = usePullUp(name)

    const volumePresets = [40, 55, 60, 65, 70, 80];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    if (props.hiddenOff && !on) { return null }

    return (
        <>
            <Stack spacing="xl">
                <Group spacing="xl" >
                    <PowerStateAvatar 
                        endpointId={ props.endpointId } 
                        icon={ on ?
                            <IconDeviceSpeaker size={24}  />  
                            :
                            <IconDeviceSpeaker size={24} /> 
                            } 
                        />
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4} onClick={showPullUp}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            {name}
                        </Text>
                        { (on || zone2On) && <ReceiverDetailLine endpointId={props.endpointId} zone2={zone2} />  }
                    </Stack>
                </Group>
                { on &&
                    <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
                }
            </Stack>
            <ReceiverPullUp endpointId={props.endpointId} zone2={zone2}  />
        </>
    );
}

export default Receiver;
