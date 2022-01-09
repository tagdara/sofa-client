import React from 'react';
import { Group } from '@mantine/core'
import MutedSegment from 'device-model/property/muted/MutedSegment'
import useMuted from 'device-model/property/muted/useMuted'
import InputSegment from 'device-model/property/input/InputSegment'

const TelevisionDetailLine = props => {

    const { muted } = useMuted(props.endpointId)

    return  <Group style={{ padding: "2px 0"}} spacing={2} >
                <InputSegment endpointId={props.endpointId} />
                { muted && <MutedSegment icon endpointId={props.endpointId} /> }
            </Group> 
}

export default TelevisionDetailLine
