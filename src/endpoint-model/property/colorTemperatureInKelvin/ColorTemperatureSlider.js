import React from 'react';
import { Group, ThemeIcon } from '@mantine/core'

import CardLineSlider from 'components/CardLineSlider';
import useColorTemperatureInKelvin from 'endpoint-model/property/colorTemperatureInKelvin/useColorTemperatureInKelvin'

import { IconTemperature } from '@tabler/icons';

const ColorTemperatureSlider = props => {

    const { colorTemperatureInKelvin, setColorTemperature } = useColorTemperatureInKelvin(props.endpointId, props.value, props.directive )
    
    if (!colorTemperatureInKelvin) { return null }

    return (
        <Group noWrap>
            { props.icon &&
                <ThemeIcon variant="light">
                    <IconTemperature size={16} />
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


