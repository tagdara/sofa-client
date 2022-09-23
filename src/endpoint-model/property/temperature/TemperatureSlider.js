import React from 'react';
import CardLineSlider from 'layout/components/CardLineSlider';
import { Group } from '@mantine/core'
import useTemperatureSensor from 'endpoint-model/controller/TemperatureSensor/useTemperatureSensor'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'

export default function TemperatureSlider(props) {

    const { temperature, setTemperature } = useTemperatureSensor(props.endpointId, props.value, props.directive)
    const { powerState } = usePowerState(props.endpointId)

    if (temperature === undefined ) { return null }

    const disabled = props.disabled || (props.value === undefined && powerState === "OFF")

    return (
        <Group noWrap style={{ flexGrow: 1}}>
            <CardLineSlider label={"Temperature"} 
                minWidth={200}
                value={ temperature } on={true}
                change={ setTemperature }
                disabled={ disabled }
            />
        </Group>
    );
}

