import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import { IconPlug } from '@tabler/icons';
import { Group, ThemeIcon, Text } from '@mantine/core'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'

export default function EnergyLevelLine(props) {

    const { modeLabel } = useMode(props.endpointId, "Energy Level", props.value, props.directive)

    return (
        <Group noWrap position="apart" style={{ paddingRight: 8 }}>
            <Group noWrap>
            { props.icon &&
                <ThemeIcon variant="light">
                    <IconPlug size={16} />
                </ThemeIcon >
            }
            { props.label &&
                <Text>{props.label === true ? "Energy Use:" : props.label }</Text>
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

