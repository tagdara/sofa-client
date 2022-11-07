import React from 'react';
import { Group } from '@mantine/core'
import MutedSegment from 'endpoint-model/property/muted/MutedSegment'
import useMuted from 'endpoint-model/property/muted/useMuted'
import InputSegment from 'endpoint-model/property/input/InputSegment'
import InputLockSegment from 'devices/Receiver/InputLockSegment'
import ModeSegment from 'endpoint-model/property/mode/ModeSegment'
import useMode from 'endpoint-model/property/mode/useMode'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import VolumeSegment from 'endpoint-model/property/volume/VolumeSegment'

const ReceiverDetailLine = props => {

    const { muted } = useMuted(props.endpointId)
    const { mode } = useMode(props.endpointId, 'Input.Lock')
    const locked = mode === 'Lock.Locked' 
    const { powerStateBool: zone2On } = usePowerState(props.zone2)
    const { powerStateBool: on } = usePowerState(props.endpointId)

    return  <Group noWrap spacing="sm" >
                { (on && locked) && <InputLockSegment text size="xs" icon endpointId={props.endpointId} /> }
                { on && <InputSegment text size="xs" endpointId={props.endpointId} /> }
                { on && <ModeSegment text size="xs" endpointId={props.endpointId} instance={"Sound.Program"} /> }
                { (on && muted) && <MutedSegment size="xs" icon endpointId={props.endpointId} /> }
                { zone2On && <VolumeSegment text color="blue" size="xs" icon prefix="Zone 2: " endpointId={props.zone2} /> }
            </Group> 
}

export default ReceiverDetailLine
