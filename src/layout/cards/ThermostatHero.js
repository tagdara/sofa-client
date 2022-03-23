import React from 'react';
import ThermostatCard from 'devices/Thermostat/ThermostatCard'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'

const ThermostatHero = props => {
    const primary =  endpointIdByFriendlyName(props.primary)
    const secondary =  endpointIdByFriendlyName(props.secondary)
    const airQuality =  endpointIdByFriendlyName(props.indoorAirQuality)
    const currentHour = new Date().getHours();
    const night = currentHour >= 22 || currentHour <= 8

    return (
        <>
            <ThermostatCard endpointId={primary} airQuality={ night ? undefined : airQuality } expand />
            { night &&
                <ThermostatCard endpointId={secondary} airQuality={airQuality} />
            }
        </>
    ); 
}

export default ThermostatHero;