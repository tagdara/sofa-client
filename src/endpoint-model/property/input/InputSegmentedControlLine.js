import React from 'react';
import InputSegmentedControl from 'endpoint-model/property/input/InputSegmentedControl'
import { Group, Text} from '@mantine/core';

export const InputSegmentedControlLine = props => { 

    return (
        <Group noWrap grow position="apart" style={{ width: "100%"}}>
            <Group noWrap style={{ minWidth: "50%" }}>
                { props.icon ? props.icon : null }
                <Text>Input</Text>
            </Group>
            <InputSegmentedControl endpointId={props.endpointId} />
        </Group>
    );
}

export default InputSegmentedControlLine


