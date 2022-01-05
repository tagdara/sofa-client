import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import { Collapse, Group } from '@mantine/core'
import DeviceIcon from 'components/DeviceIcon'
import ReceiverInputSelect from 'devices/Receiver/ReceiverInputSelect'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import ModeSegmentedControl from 'device-model/property/mode/ModeSegmentedControl'
import VolumeSlider from 'device-model/property/volume/VolumeSlider'
import useMode from 'device-model/property/mode/useMode'
import usePowerState from 'device-model/property/powerState/usePowerState'
import useInput from 'device-model/property/input/useInput'

const Receiver = props => {

    const { modeLabel: surroundName } = useMode(props.endpointId, "Surround") 
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const { inputLabel } = useInput(props.endpointId)
    const [ showDetail, setShowDetail ] = useState(false);
    const name = friendlyNameByEndpointId(props.endpointId) 

    const surroundPresets = [ "7ch Stereo", "Surround Decoder", "Straight" ]
    const volumePresets = [40, 55, 60, 65, 70, 80];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    const subText = on ? inputLabel + " / "+ surroundName : null

    return (
        <Group direction="column" grow noWrap spacing="xl">
            <CardLine   arrow avatar={ <DeviceIcon endpointId={props.endpointId} /> }
                        color={ on ? "primary" : undefined}
                        primary={ name }
                        secondary={ subText }
                        onClick={ () => setShowDetail(!showDetail)}
            >
                <PowerStateSwitch endpointId={props.endpointId} />
            </CardLine>
            <Collapse in={showDetail || on }>
                <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
            </Collapse>
            <Collapse in={showDetail}>
                <Group direction="column" grow noWrap spacing="sm">
                    <ModeSegmentedControl filter={surroundPresets} endpointId={props.endpointId} instance={"Surround"} />
                    <ReceiverInputSelect endpointId={props.endpointId} />
                </Group>
            </Collapse>
        </Group>
);
}

export default Receiver;
