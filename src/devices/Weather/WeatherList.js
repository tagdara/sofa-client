import React from 'react';
import RangeValueLine from 'device-model/property/rangeValue/RangeValueLine'
import { hasInstance} from 'store/deviceHelpers'
import { Group } from '@mantine/core';
import { CloudDrizzle, Droplet, Lightbulb, Sun, Wind } from "react-bootstrap-icons";

const WeatherList = props => {

    const additionalAttributes = {  'Light Level' : { "icon" : <Lightbulb size={16} />, "unit": "lux" },
                                    'Humidity': { "icon" : <Droplet size={16} />, "unit": "%" },
                                    'Wind Speed': { "icon" : <Wind size={16} />, "unit": "m/s" },
                                    'UV Index': { "icon" : <Sun size={16} />, "unit": "" },
                                    'Rainfall': { "icon" : <CloudDrizzle size={16} />, "unit": "mm" }
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

    return (      
        <Group direction="column">
            { Object.keys(additionalAttributes).map( attribName => 
                <RangeValueLine endpointId={props.endpointId} 
                                instance={attribName} 
                                unit={additionalAttributes[attribName].unit} 
                                icon={additionalAttributes[attribName].icon} 
                                key={attribName+props.endpointId} 
                />
            )}
        </Group>
    );
}

export default WeatherList;
