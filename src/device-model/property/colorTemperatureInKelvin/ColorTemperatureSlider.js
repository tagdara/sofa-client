import React from 'react';

import CardLineSlider from 'components/CardLineSlider';
import { Group, ThemeIcon } from '@mantine/core'
import { Thermometer } from 'react-feather';
import useColorTemperatureInKelvin from 'device-model/property/colorTemperatureInKelvin/useColorTemperatureInKelvin'

const ColorTemperatureSlider = props => {

    const { colorTemperatureInKelvin, setColorTemperature } = useColorTemperatureInKelvin(props.endpointId, props.value, props.directive )

    return (
        <Group noWrap>
            { props.icon &&
                <ThemeIcon variant="light">
                    <Thermometer size={16} />
                </ThemeIcon >
            }
            <CardLineSlider label={"Temperature"} on={true}
                value={ colorTemperatureInKelvin }
                min={2000} max={7000} step={100}  change={ setColorTemperature }
                disabled={ props.disabled }
            />
        </Group>
    );
}

export default ColorTemperatureSlider;


