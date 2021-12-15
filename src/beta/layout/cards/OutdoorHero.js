import React from 'react';
import { selectPage } from 'store/layoutHelpers'
import StackCard from 'beta/components/StackCard'
import Weather from 'beta/devices/Weather/Weather';


export default function OutdoorHero(props) {
    

    return (
        <StackCard>
            <Weather    aq={props.outdoorAirQuality} 
                        current={props.outdoor} 
                        forecast={"Rainmachine"} 
                        onClick={ () => selectPage('ThermostatLayout') } 
            />  
        </StackCard>
    ); 
}
