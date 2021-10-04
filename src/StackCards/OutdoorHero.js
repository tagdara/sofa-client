import React, { useContext} from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import Weather from 'devices/Thermostat/Weather';

export default function OutdoorHero(props) {
    
    const { selectPage } = useContext(LayoutContext);
    
    return (
        <Weather current={props.outdoor} forecast={"Rainmachine"} onClick={ () => selectPage('ThermostatLayout') } wide={props.wide } 
                    indoorAirQuality={props.indoorAirQuality } outdoorAirQuality={ props.outdoorAirQuality }
        />
    ); 
}
