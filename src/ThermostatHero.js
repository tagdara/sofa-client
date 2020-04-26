import React from 'react';
import { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Thermostat from './thermostat/Thermostat';
import AirQuality from './thermostat/AirQuality';
export default function ThermostatHero(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStateByFriendlyName } = useContext(DataContext);
    const device = deviceStateByFriendlyName(props.Primary)
    //const sec = deviceStateByFriendlyName(props.Secondary)
    const aq = deviceStateByFriendlyName(props.airQuality)
    
    return (
        <>
        {   aq &&
            <AirQuality device={ aq } wide={props.wide } />
        }
        {
            device &&
            <Thermostat onClick={ () => applyLayoutCard('ThermostatLayout') } device={ device } wide={props.wide } />
        }
        </>
    );
}
