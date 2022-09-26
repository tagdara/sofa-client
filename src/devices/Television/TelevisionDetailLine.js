import React from 'react';
import { Group } from '@mantine/core'
import ModeSegment from 'endpoint-model/property/mode/ModeSegment'
import MutedSegment from 'endpoint-model/property/muted/MutedSegment'
import useMuted from 'endpoint-model/property/muted/useMuted'
import InputSegment from 'endpoint-model/property/input/InputSegment'
import useMode from 'endpoint-model/property/mode/useMode'
import useInput from 'endpoint-model/property/input/useInput'

const TelevisionDetailLine = props => {

    const { muted } = useMuted(props.endpointId)
    const { modeLabel } = useMode(props.endpointId, "Audio.Output")
    const speakersOff = modeLabel === "Receiver"
    const { inputLabel } = useInput(props.endpointId)   
    const matrixInstance = "Output.Source"

    return  <Group spacing={"sm"} >
                <InputSegment text size="xs" endpointId={props.endpointId} />
                { inputLabel === "Matrix" &&
                    <ModeSegment text endpointId={props.matrix} instance={matrixInstance} />
                }
                { ( !speakersOff && muted ) &&  <MutedSegment size="xs" icon endpointId={props.endpointId} /> }
            </Group> 
}

export default TelevisionDetailLine
