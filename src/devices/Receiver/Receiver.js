import React, { useState } from 'react';
import CardLine from 'layout/components/CardLine'
import { Collapse, Group, Stack } from '@mantine/core'
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import ModeSelect from 'endpoint-model/property/mode/ModeSelect'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import MutedButton from 'endpoint-model/property/muted/MutedButton'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import InputSegmentedControl from 'endpoint-model/property/input/InputSegmentedControl'
import InputLockButton from 'devices/Receiver/InputLockButton'
import ReceiverDetailLine from 'devices/Receiver/ReceiverDetailLine'

const Receiver = props => {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const [ showDetail, setShowDetail ] = useState(false);
    const name = friendlyNameByEndpointId(props.endpointId) 

    const surroundPresets = [ "7ch Stereo", "Surround Decoder", "Straight" ]
    const volumePresets = [40, 55, 60, 65, 70, 80];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    return (
        <Stack spacing="xl">
            <Stack spacing={8}>
                <CardLine   arrow icon={ <EndpointIcon endpointId={props.endpointId} /> }
                            color={ on ? "primary" : undefined}
                            on={on}
                            primary={ name }
                            onClick={ () => setShowDetail(!showDetail)}
                >
                    <PowerStateSwitch endpointId={props.endpointId} />
                </CardLine>
                { on && <ReceiverDetailLine endpointId={props.endpointId} />  }
            </Stack>
            <Collapse in={showDetail || on }>
                <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
            </Collapse>
            <Collapse in={showDetail}>
                <Stack spacing="sm">
                    <Group grow noWrap position={"apart"}>
                        <ModeSelect filter={surroundPresets} endpointId={props.endpointId} instance={"Sound.Program"} />
                        <MutedButton endpointId={props.endpointId} />
                    </Group>
                    <Group grow noWrap position={"apart"}>
                        <InputSegmentedControl endpointId={props.endpointId} />
                        <InputLockButton endpointId={props.endpointId} />
                    </Group>
                </Stack>
            </Collapse>
        </Stack>
);
}

export default Receiver;
