import React from 'react';
import { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import TemperatureSensor from './thermostat/TemperatureSensor';

export default function ThermostatHero(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceByFriendlyName } = useContext(DataContext);
    const device = deviceByFriendlyName(props.Primary)
        
    return (
        !device ? null :
        <TemperatureSensor onClick={ () => applyLayoutCard('ThermostatLayout') } key={ device.endpointId } device={ device } wide={props.wide } />
    );
}
