import React from 'react';
import ThermostatModeButtons from 'endpoint-model/property/thermostatMode/ThermostatModeButtons'
import { IconTemperature } from '@tabler/icons';
import { Group, Text, ActionIcon } from '@mantine/core'

const ThermostatModeLine = props => {

    return ( 
        <Group noWrap position="apart" style={{ width: "100%", flexGrow: 1}}>
            { (props.icon || props.label) &&
                <Group noWrap style={{ minWidth: "30%"}}>
                { props.icon &&
                    <ActionIcon variant="light">
                        <IconTemperature size={16} />
                    </ActionIcon >
                }
                { props.label &&
                    <Text>Mode</Text>
                }
                </Group>
            }
            <ThermostatModeButtons size="xs" endpointId={props.endpointId} />  
        </Group>
    )
}

export default ThermostatModeLine 
