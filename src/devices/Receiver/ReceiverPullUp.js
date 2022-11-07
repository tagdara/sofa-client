import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import ModeLine from 'endpoint-model/property/mode/ModeLine'
import MutedLine from 'endpoint-model/property/muted/MutedLine'
// import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import InputSegmentedControlLine from 'endpoint-model/property/input/InputSegmentedControlLine'
import InputLockButton from 'devices/Receiver/InputLockButton'
import PullUpCard from 'layout/pullup/PullUpCard'
import { ActionIcon, Divider, Stack } from '@mantine/core'
import { IconAccessPoint } from '@tabler/icons';
import PowerStateLine from 'endpoint-model/property/powerState/PowerStateLine'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'

const ReceiverPullUp = props => {

    // const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const surroundPresets = [ "7ch Stereo", "Surround Decoder", "Straight" ]
    const volumePresets = [40, 55, 60, 65, 70, 80];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))
    const { powerStateBool: zone2On } = usePowerState(props.zone2)

    return (
        <PullUpCard name={name} title={name} >
            <Stack spacing="xl">
                <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
                <MutedLine endpointId={props.endpointId} />
                <ModeLine 
                    icon={
                        <ActionIcon>
                            < IconAccessPoint size={20} />
                        </ActionIcon> 
                    }
                    filter={surroundPresets} 
                    endpointId={props.endpointId} 
                    instance={"Sound.Program"} 
                />
                <InputSegmentedControlLine icon={<InputLockButton endpointId={props.endpointId} />} endpointId={props.endpointId} />
                <Divider />
                <PowerStateLine icon label="Zone 2" endpointId={props.zone2} />
                { zone2On &&
                    <VolumeSlider endpointId={props.zone2} />
                }
            </Stack>
        </PullUpCard>
    );
}

export default ReceiverPullUp;
