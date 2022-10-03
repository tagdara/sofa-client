import React from 'react';
import { ActionIcon, Group, Text,  } from '@mantine/core'
import ToggleStateSwitch from 'endpoint-model/property/toggleState/ToggleStateSwitch'

export default function ToggleStateLine(props) { 

    return (
        <Group noWrap position="apart" style={{ width: "100%", flexGrow: 1}}>
            { (props.icon || props.label) &&
                <Group noWrap style={{ minWidth: "50%"}}>
                { props.icon &&
                    <ActionIcon >
                        {props.icon }
                    </ActionIcon >
                }
                { props.label &&
                    <Text>{props.label}</Text>
                }
                </Group>
            }
            <ToggleStateSwitch endpointId={props.endpointId} instance={props.instance} />
        </Group>
    );
}


