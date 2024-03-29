import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import { IconRecharging } from '@tabler/icons';
import { ActionIcon, Group, Text } from '@mantine/core'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'

export default function EnergyLevelLine(props) {

    const { modeLabel } = useMode(props.endpointId, "Energy.Level", props.value, props.directive)

    return (
        <Group noWrap position="apart" style={{ paddingRight: 8 }}>
            <Group noWrap>
            { props.icon &&
                <ActionIcon>
                    <IconRecharging size={20} />
                </ActionIcon >
            }
            { props.label &&
                <Text>{props.label === true ? "Energy Use" : props.label }</Text>
            }
            { props.switch &&
                <Text>{modeLabel}</Text>
            }
            </Group>
            { props.switch ?
                <PowerStateSwitch endpointId={props.endpointId} />
                :
                <Text>{modeLabel}</Text>
            }
        </Group>
    )
}

