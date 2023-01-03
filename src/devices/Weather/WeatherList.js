import React from 'react';
import RangeValueLine from 'endpoint-model/property/rangeValue/RangeValueLine'
import { hasInstance} from 'endpoint-model/discovery'
import { Stack, Text } from '@mantine/core';
import { IconCloudRain, IconDroplet, IconBrightnessHalf, IconSun, IconWind } from '@tabler/icons';

import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'

const WeatherList = props => {

    const { reachable } = useEndpointHealth(props.endpointId)
    const additionalAttributes = {  'Light.Level' : { "icon" : <IconBrightnessHalf size={16} />, "unit": "lux" },
                                    'Air.Humidity': { "icon" : <IconDroplet size={16} />, "unit": "%" },
                                    'Wind.Speed': { "icon" : <IconWind size={16} />, "unit": "mph" },
                                    'Sun.UVI': { "icon" : <IconSun size={16} />, "unit": "" },
                                    'Weather.Rainfall': { "icon" : <IconCloudRain size={16} />, "unit": "in" }
                                }

    function checkMoreData() {
        const items = Object.keys(additionalAttributes)
        for (var k = 0; k < items.length; k++) {
            if (hasInstance(props.endpointId, items[k])) {
                return true
            }
        }
        return false
    }


    const hasMoreData = checkMoreData()

    if (!hasMoreData) { return null }

    if (!reachable) { 
        return (
            <Stack>
                <Text>Please check the weather station batteries</Text>
            </Stack>
        )
    
    }

    return (      
        <Stack>
            { Object.keys(additionalAttributes).map( attribName => 
                <RangeValueLine 
                    size="md"
                    endpointId={props.endpointId} 
                    instance={attribName} 
                    unit={additionalAttributes[attribName].unit} 
                    icon={additionalAttributes[attribName].icon} 
                    key={attribName+props.endpointId} 
                />
            )}
        </Stack>
    );
}

export default WeatherList;
