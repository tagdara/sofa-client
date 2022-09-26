import React from 'react';
import useInput from 'endpoint-model/property/input/useInput'
import SegmentMenu from 'layout/components/SegmentMenu'
import { Text } from '@mantine/core'

export default function InputSegment(props) {

    const { inputLabel, selections, selectInput} = useInput(props.endpointId, props.value, props.directive)

    if (props.text) {
        return inputLabel ? <Text size="xs" color="dimmed" >{inputLabel}</Text> : null 
    }

    return (
        <SegmentMenu size={props.size} value={inputLabel} selections={selections} select={selectInput} />
    );
}

