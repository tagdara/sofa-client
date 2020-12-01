import React, { useContext} from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import Weather from './thermostat/Weather';

export default function OutdoorHero(props) {
    
    const { selectPage } = useContext(LayoutContext);
    
    return (
        <Weather current={props.outdoor} forecast={"Rainmachine"} onClick={ () => selectPage('ThermostatLayout') } wide={props.wide } />
    ); 
}
