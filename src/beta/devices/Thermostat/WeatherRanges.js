import React from 'react';
import RangeValueLine from 'controllers/rangeController/RangeValueLine'
import { deviceByEndpointId, hasInstance} from 'store/deviceHelpers'
import { Collapse } from '@mantine/core';

const WeatherRanges = props => {
    const additionalAttributes = ['Light Level', 'Humidity', 'Wind Speed', 'UV Index', 'Rainfall']
    const device = deviceByEndpointId(props.endpointId)

    function checkMoreData() {
        for (var k = 0; k < additionalAttributes.length; k++) {
            if (hasInstance(props.endpointId, additionalAttributes[k])) {
                return true
            }
        }
        return false
    }

    const hasMoreData = checkMoreData()

    if (!hasMoreData) { return null }

    return (      
        <Collapse in={props.show}>
            { additionalAttributes.map( attribName => 
                <RangeValueLine endpointId={props.endpointId} instance={attribName} key={attribName+props.endpointId} />
            )}
        </Collapse>
    );
}

export default WeatherRanges;
