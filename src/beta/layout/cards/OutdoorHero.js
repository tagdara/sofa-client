import React from 'react';
import { selectPage } from 'store/layoutHelpers'

import Weather from 'beta/devices/Thermostat/Weather';

export default function OutdoorHero(props) {
    
    return (
        <Weather current={props.outdoor} forecast={"Rainmachine"} onClick={ () => selectPage('ThermostatLayout') } wide={props.wide } 
                    indoorAirQuality={props.indoorAirQuality } outdoorAirQuality={ props.outdoorAirQuality }
        />
    ); 
}
