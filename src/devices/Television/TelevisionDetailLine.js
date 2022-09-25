import React from 'react';
import { Group } from '@mantine/core'
import MutedSegment from 'endpoint-model/property/muted/MutedSegment'
import useMuted from 'endpoint-model/property/muted/useMuted'
import InputSegment from 'endpoint-model/property/input/InputSegment'
import useMode from 'endpoint-model/property/mode/useMode'

const TelevisionDetailLine = props => {

    const { muted } = useMuted(props.endpointId)
    const { modeLabel } = useMode(props.endpointId, "Audio.Output")
    const speakersOff = modeLabel === "Receiver"
    
    return  <Group spacing={2} >
                <InputSegment size="xs" endpointId={props.endpointId} />
                { ( !speakersOff && muted ) &&  <MutedSegment size="xs" icon endpointId={props.endpointId} /> }
            </Group> 
}

export default TelevisionDetailLine
