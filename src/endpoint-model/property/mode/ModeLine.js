import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import ModeSelect from 'endpoint-model/property/mode/ModeSelect'
import { Group, Text} from '@mantine/core';

export const ModeLine = props => { 

    const { friendlyName } = useMode(props.endpointId, props.instance, props.value, props.directive)

    return (
        <Group noWrap grow position="apart" style={{ width: "100%"}}>
            <Group noWrap style={{ minWidth: props.labelWidth ? props.labelWidth : "50%" }}>
                { props.icon ? props.icon : null }
                <Text>{props.label ? props.label : friendlyName}</Text>
            </Group>
            <ModeSelect size={props.size} disabled={props.disabled} filter={props.filter} instance={props.instance} endpointId={props.endpointId} />
        </Group>
    );
}

export default ModeLine


