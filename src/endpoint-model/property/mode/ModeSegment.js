import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import SegmentMenu from 'layout/components/SegmentMenu'
import { Text } from '@mantine/core'

export default function ModeSegment(props) {

    const { modeLabel, selections, setMode} = useMode(props.endpointId, props.instance, props.value, props.directive)

    if (!selections || !selections.length) { return null }

    if (props.text) {
        return modeLabel ? <Text size="xs" color="dimmed" >{modeLabel}</Text> : null 
    }

    return (
        <SegmentMenu size={props.size} value={ modeLabel } selections={selections} select={setMode} />
    );
}

