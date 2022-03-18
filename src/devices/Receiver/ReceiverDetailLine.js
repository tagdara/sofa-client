import React from 'react';
import { Group } from '@mantine/core'
import MutedSegment from 'device-model/property/muted/MutedSegment'
import useMuted from 'device-model/property/muted/useMuted'
import InputSegment from 'device-model/property/input/InputSegment'
import InputLockSegment from 'devices/Receiver/InputLockSegment'
import ModeSegment from 'device-model/property/mode/ModeSegment'
import useMode from 'device-model/property/mode/useMode'

const ReceiverDetailLine = props => {

    const { muted } = useMuted(props.endpointId)
    const { mode } = useMode(props.endpointId, 'Receiver.InputLock')
    const locked = mode === 'InputLock.Locked' 

    return  <Group style={{ paddingLeft: 48 }} spacing={2} >
                { locked && <InputLockSegment size="xs" icon endpointId={props.endpointId} /> }
                <InputSegment size="xs" endpointId={props.endpointId} />
                <ModeSegment size="xs" endpointId={props.endpointId} instance={"Surround"} />
                { muted && <MutedSegment size="xs" icon endpointId={props.endpointId} /> }
            </Group> 
}

export default ReceiverDetailLine
