import React from 'react';
import CardLineSlider from 'components/CardLineSlider';
import { Group } from '@mantine/core'
import useRangeValue from 'endpoint-model/property/rangeValue/useRangeValue'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'

export default function RangeValueSlider(props) {

    const { minimumRange, maximumRange, sliderPrecision, rangeValue, setRangeValue } = useRangeValue(props.endpointId, props.instance, props.value, props.directive)
    const { powerState } = usePowerState(props.endpointId)

    if (rangeValue === undefined ) { return null }

    const disabled = props.disabled || (props.value === undefined && powerState === "OFF")

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            <CardLineSlider label={"RangeValue"} 
                minWidth={200}
                value={ rangeValue } on={true}
                min={minimumRange} 
                max={maximumRange} 
                step={sliderPrecision} 
                change={setRangeValue}
                disabled={ disabled }
            />
        </Group>
    );
}

