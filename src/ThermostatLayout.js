import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import GridSection from './GridSection';
import TemperatureSensor from './thermostat/TemperatureSensor';
import Thermostat from './thermostat/Thermostat';

export default function ThermostatLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const [thermostats, setThermostats]=useState([])
    const [temperatureSensors, setTemperatureSensors]=useState([])

    useEffect(() => {
        setThermostats(getEndpointIdsByCategory('THERMOSTAT','ThermostatLayout'))
        setTemperatureSensors(getEndpointIdsByCategory('TEMPERATURE_SENSOR','ThermostatLayout'))
        return function cleanup() {
            unregisterDevices('ThermostatLayout');
        };
    // eslint-disable-next-line 
    }, [ ] )



    return (    
        cardReady('ThermostatLayout') ?
        <React.Fragment>
            <GridSection name={"Thermostats"}>
                { thermostats.map((thermostat) =>
                    <Thermostat key={ thermostat } device={ devices[thermostat] }  deviceState={ deviceStates[thermostat] }/>
                )}
            </GridSection>
            
            <GridSection name={"Temperatures"}>
                { temperatureSensors.map((thermostat) =>
                    <TemperatureSensor key={ thermostat } device={ devices[thermostat] }  deviceState={ deviceStates[thermostat] } />
                )}
            </GridSection>
        </React.Fragment>
        : null
    )
};