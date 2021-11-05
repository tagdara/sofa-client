import React from 'react';

import { endpointIdsByDisplayCategory } from 'store/deviceHelpers';

import GridSection from 'components/GridSection';
import TemperatureSensor from 'devices/Thermostat/TemperatureSensor';
import Thermostat from 'devices/Thermostat/Thermostat';
import Forecast from 'devices/Thermostat/Forecast';

const ThermostatLayout = props => {

    const thermostats = endpointIdsByDisplayCategory('THERMOSTAT')
    const temperatureSensors = endpointIdsByDisplayCategory('TEMPERATURE_SENSOR')

    return (    
        <>
            <GridSection name={"Thermostats"}>
                { thermostats.map( endpointId =>
                    <Thermostat key={ endpointId } endpointId={endpointId} />
                )}
            </GridSection>
            
            <GridSection name={"Temperatures"}>
                { temperatureSensors.map( endpointId =>
                    <TemperatureSensor key={ endpointId } endpointId={endpointId} />
                 )}
            </GridSection>

            <GridSection name={"Forecast"}>
                <Forecast Primary={"Rainmachine"}  />
            </GridSection>
        </>
    )
};

export default ThermostatLayout;