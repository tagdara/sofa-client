import React from 'react';
import CardLineSlider from 'layout/components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import useRangeValue from 'endpoint-model/property/rangeValue/useRangeValue'
import { IconPlug } from '@tabler/icons';

export default function OnLevelSlider(props) {

    const { rangeValue, rangeValueLabel, setRangeValue, disabled } = useRangeValue(props.endpointId, "Light.OnLevel", props.value, props.directive )
    
    if (rangeValue === undefined ) { return null }

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            <ThemeIcon variant="light">
                <IconPlug size={16} />
            </ThemeIcon >
            <CardLineSlider label={rangeValueLabel} 
                value={ rangeValue } on={true}
                min={0} max={100} step={10} change={setRangeValue}
                disabled={ disabled }
            />
        </Group>
    );
}

