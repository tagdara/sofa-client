import React from 'react';
import InputSelect from 'endpoint-model/property/input/InputSelect'
import { Group, Text} from '@mantine/core';

export const InputSelectLine = props => { 

    return (
        <Group noWrap grow position="apart" style={{ width: "100%"}}>
            <Group noWrap style={{ minWidth: "50%" }}>
                { props.icon ? props.icon :  null }
                <Text>{props.label ? props.label : "Input"}</Text>
            </Group>
            <InputSelect endpointId={props.endpointId} />
        </Group>
    );
}

export default InputSelectLine


