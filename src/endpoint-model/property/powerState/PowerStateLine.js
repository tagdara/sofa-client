import React from 'react';
import { ActionIcon, Group, Text,  } from '@mantine/core'
import { IconPlug } from '@tabler/icons';
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'

export default function PowerStateLine(props) { 

    return (
        <Group noWrap position="apart" style={{ width: "100%", flexGrow: 1}}>
            { (props.icon || props.label) &&
                <Group noWrap style={{ minWidth: "50%"}}>
                { props.icon &&
                    <ActionIcon >
                        <IconPlug size={20} />
                    </ActionIcon >
                }
                { props.label &&
                    <Text>{props.label}</Text>
                }
                </Group>
            }
            <PowerStateSwitch endpointId={props.endpointId} />
        </Group>
    );
}


