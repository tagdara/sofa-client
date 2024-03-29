import React from 'react';

import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import TemperatureSensorLine from 'endpoint-model/controller/TemperatureSensor/TemperatureSensorLine';
import { Stack } from '@mantine/core';

const ThermostatList = props => {

    const temperatureSensors = sortByName(endpointIdsByDisplayCategory('TEMPERATURE_SENSOR'), ['Cayuga Weather Station', 'Sofa Host'])

    return (    
        <Stack style={{ width: "100%"}}>
            { temperatureSensors.map( endpointId =>
                <TemperatureSensorLine key={ endpointId } endpointId={endpointId} size="md"  />
            )}
        </Stack>
    )
};

export default ThermostatList;