import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import { Collapse, Group } from '@mantine/core'
import DeviceIcon from 'components/DeviceIcon'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import ModeSelect from 'device-model/property/mode/ModeSelect'
import VolumeSlider from 'device-model/property/volume/VolumeSlider'
import MutedButton from 'device-model/property/muted/MutedButton'
import usePowerState from 'device-model/property/powerState/usePowerState'
import InputSegmentedControl from 'device-model/property/input/InputSegmentedControl'
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
        <Group direction="column" grow noWrap spacing="xl">
            <CardLine   arrow icon={ <DeviceIcon endpointId={props.endpointId} /> }
                        color={ on ? "primary" : undefined}
                        on={on}
                        primary={ name }
                        secondary={ on ? <ReceiverDetailLine endpointId={props.endpointId} /> : null }
                        onClick={ () => setShowDetail(!showDetail)}
            >
                <PowerStateSwitch endpointId={props.endpointId} />
            </CardLine>
            <Collapse in={showDetail || on }>
                <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
            </Collapse>
            <Collapse in={showDetail}>
                <Group direction="column" grow noWrap spacing="sm">
                    <Group grow noWrap position={"apart"}>
                        <ModeSelect filter={surroundPresets} endpointId={props.endpointId} instance={"Surround"} />
                        <MutedButton endpointId={props.endpointId} />
                    </Group>
                    <Group grow noWrap position={"apart"}>
                        <InputSegmentedControl endpointId={props.endpointId} />
                        <InputLockButton endpointId={props.endpointId} />
                    </Group>
                </Group>
            </Collapse>
        </Group>
);
}

export default Receiver;
