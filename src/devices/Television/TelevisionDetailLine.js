import React from 'react';
import { Group } from '@mantine/core'
import MutedSegment from 'device-model/property/muted/MutedSegment'
import useMuted from 'device-model/property/muted/useMuted'
import InputSegment from 'device-model/property/input/InputSegment'

const TelevisionDetailLine = props => {

    const { muted } = useMuted(props.endpointId)

    return  <Group style={{ paddingLeft: 48 }} spacing={2} >
                <InputSegment size="xs" endpointId={props.endpointId} />
                { muted && <MutedSegment size="xs" icon endpointId={props.endpointId} /> }
            </Group> 
}

export default TelevisionDetailLine
