import React from 'react';
import { IconThermometer } from '@tabler/icons';
import { Group, Text, ActionIcon } from '@mantine/core'
import TargetSetpointAdjuster from 'endpoint-model/property/targetSetpoint/TargetSetpointAdjuster'

const TargetSetpointLine = props => {

    return ( 
        <Group noWrap position="apart" style={{ width: "100%", flexGrow: 1}}>
            { (props.icon || props.label) &&
                <Group noWrap style={{ minWidth: "40%"}}>
                { props.icon &&
                    <ActionIcon variant="light">
                        <IconThermometer size={16} />
                    </ActionIcon >
                }
                { props.label &&
                    <Text>Set point</Text>
                }
                </Group>
            }
            <TargetSetpointAdjuster endpointId={props.endpointId} />
        </Group>
    )
}

export default TargetSetpointLine
