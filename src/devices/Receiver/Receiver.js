import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PowerStateAvatar from 'endpoint-model/property/powerState/PowerStateAvatar'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import ReceiverDetailLine from 'devices/Receiver/ReceiverDetailLine'
import useLayoutStore from 'layout/layoutStore'
import { Group, Stack, Text } from '@mantine/core'
import ReceiverPullUp from 'devices/Receiver/ReceiverPullUp'
import { IconDeviceSpeaker, IconDeviceSpeakerOff } from '@tabler/icons';


const Receiver = props => {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 

    const volumePresets = [40, 55, 60, 65, 70, 80];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpActive = stackPullUp === name

    const showOverlay = () => {
        setStackCardHighlight(pullUpActive ? null : 'ReceiverHero')
        setStackPullUp(pullUpActive ? null : name, {})
    }

    return (
        <>
            <Stack spacing="xl">
                <Group spacing="xl" onClick={showOverlay}>
                    <PowerStateAvatar 
                        endpointId={ props.endpointId } 
                        icon={ on ?
                            <IconDeviceSpeaker size={24} endpointId={props.endpointId} />  
                            :
                            <IconDeviceSpeakerOff size={24} endpointId={props.endpointId} /> 
                            } 
                        />
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            {name}
                        </Text>
                        { on && <ReceiverDetailLine endpointId={props.endpointId} />  }
                    </Stack>
                </Group>
                { (pullUpActive || on) &&
                    <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
                }
            </Stack>
            { pullUpActive && <ReceiverPullUp endpointId={props.endpointId} /> }
        </>
);
}

export default Receiver;
