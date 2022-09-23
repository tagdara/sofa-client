import React from 'react';

import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import Thermostat from 'devices/Thermostat/Thermostat';
import TemperatureSensorLine from 'endpoint-model/controller/TemperatureSensor/TemperatureSensorLine';
import { Stack } from '@mantine/core';

const ThermostatList = props => {


    const thermostats = sortByName(endpointIdsByDisplayCategory('THERMOSTAT'), ['Main Thermostat'])
    const temperatureSensors = sortByName(endpointIdsByDisplayCategory('TEMPERATURE_SENSOR'), ['Cayuga Weather Station', 'Sofa Host'])

    return (    
        <Stack style={{ width: "100%"}}>
            { thermostats.map( endpointId =>
                <Thermostat key={ endpointId } endpointId={endpointId} size="md" />
            )}
            { temperatureSensors.map( endpointId =>
                <TemperatureSensorLine key={ endpointId } endpointId={endpointId} size="md"  />
            )}
        </Stack>
    )
};

export default ThermostatList;