import React from 'react';
import CardLineSlider from 'layout/components/CardLineSlider';
import { Group, Text, ActionIcon } from '@mantine/core'
import usePowerLevel from 'endpoint-model/property/powerLevel/usePowerLevel'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import { IconRecharging} from '@tabler/icons';

export default function PowerLevelSliderLine(props) {

    const { powerLevel, setPowerLevel } = usePowerLevel(props.endpointId, props.value, props.directive)
    const { powerStateBool } = usePowerState(props.endpointId)

    if ( powerLevel === undefined ) { return null }

    const disabled = props.disabled || ( props.value === undefined && !powerStateBool )
    const on = ( props.value !== undefined || powerStateBool || props.on)

    return (
        <Group noWrap position="apart" style={{ width: "100%", flexGrow: 1}}>
            { (props.icon || props.label) &&
                <Group noWrap style={{ minWidth: "50%"}}>
                { props.icon &&
                    <ActionIcon variant="light">
                        <IconRecharging size={16} />
                    </ActionIcon >
                }
                { props.label &&
                    <Text>Power level</Text>
                }
                </Group>
            }
            <CardLineSlider label={"PowerLevel"} 
                value={ powerLevel } 
                on={on}
                change={setPowerLevel}
                disabled={ disabled }
                marks={props.marks}
                hideLabels={props.hideLabels}
                step={ props.step ? props.step : 10 }
            />
        </Group>
    );
}

