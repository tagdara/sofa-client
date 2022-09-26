import React from 'react';
import { Group } from '@mantine/core'
import MutedSegment from 'endpoint-model/property/muted/MutedSegment'
import useMuted from 'endpoint-model/property/muted/useMuted'
import InputSegment from 'endpoint-model/property/input/InputSegment'
import InputLockSegment from 'devices/Receiver/InputLockSegment'
import ModeSegment from 'endpoint-model/property/mode/ModeSegment'
import useMode from 'endpoint-model/property/mode/useMode'

const ReceiverDetailLine = props => {

    const { muted } = useMuted(props.endpointId)
    const { mode } = useMode(props.endpointId, 'Input.Lock')
    const locked = mode === 'Lock.Locked' 

    return  <Group noWrap spacing="sm" >
                { locked && <InputLockSegment text size="xs" icon endpointId={props.endpointId} /> }
                <InputSegment text size="xs" endpointId={props.endpointId} />
                <ModeSegment text size="xs" endpointId={props.endpointId} instance={"Sound.Program"} />
                { muted && <MutedSegment size="xs" icon endpointId={props.endpointId} /> }
            </Group> 
}

export default ReceiverDetailLine
