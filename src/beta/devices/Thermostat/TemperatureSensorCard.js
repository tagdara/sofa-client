import React, { useState }from 'react';
import TemperatureSensorLine from 'beta/device-model/controller/TemperatureSensor/TemperatureSensorLine'
import { deviceByEndpointId, hasInstance} from 'store/deviceHelpers'
import { ChevronDown, ChevronUp } from 'react-feather'
import StackCard from 'beta/components/StackCard'
import { Group } from '@mantine/core';

const TemperatureSensorCard = props => {

    const [ showDetail, setShowDetail ] = useState(false)
    const additionalAttributes = ['Light Level', 'Humidity', 'Wind Speed', 'UV Index', 'Rainfall']
    const device = deviceByEndpointId(props.endpointId)
    const name = device.friendlyName
   
    function toggleDetail() {
        setShowDetail(!showDetail)
    }

    function checkMoreData() {
        for (var k = 0; k < additionalAttributes.length; k++) {
            if (hasInstance(props.endpointId, additionalAttributes[k])) {
                return true
            }
        }
        return false
    }

    const hasMoreData = checkMoreData()

    return (
        <StackCard>
            <Group direction="row" noWrap onClick={ hasMoreData ? toggleDetail : undefined} >
                <TemperatureSensorLine endpointId={props.endpointId} />
                { hasMoreData && <ActionIcon onClick={toggleDetail} >
                                    { showDetail ? <ChevronDown size={20} /> : <ChevronUp size={20} /> }
                                </ActionIcon> 
                }
            </Group>
            <WeatherRanges endpointId={props.endpointId} show={showDetail} />
        </StackCard>
    )
}

export default TemperatureSensorCard;
