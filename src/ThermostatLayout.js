import React from 'react';
import { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import GridSection from './GridSection';
import TemperatureSensor from './thermostat/TemperatureSensor';
import Thermostat from './thermostat/Thermostat';

export default function ThermostatLayout(props) {

    const { devicesByCategory } = useContext(DataContext);
    const thermostats=devicesByCategory('THERMOSTAT')
    const temperatureSensors=devicesByCategory('TEMPERATURE_SENSOR')

    return (    
        <React.Fragment>
            <GridSection name={"Thermostats"}>
                { thermostats.map((device) =>
                    <Thermostat key={ device.endpointId } device={ device }  />
                )}
            </GridSection>
            
            <GridSection name={"Temperatures"}>
                { temperatureSensors.map((device) =>
                    <TemperatureSensor key={ device.endpointId } device={ device } />
                )}
            </GridSection>
        </React.Fragment>
    )
};