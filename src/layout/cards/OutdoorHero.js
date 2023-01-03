import React from 'react';
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import WeatherCard from 'devices/Weather/WeatherCard'
export default function OutdoorHero(props) {
    
    const weatherEndpointId = endpointIdByFriendlyName(props.outdoor)
    const outdoorAirQualityEndpointId = endpointIdByFriendlyName(props.outdoorAirQuality)

    return (
        <WeatherCard 
            weatherEndpointId={weatherEndpointId} 
            airQualityEndpointId={outdoorAirQualityEndpointId}
        />
    ); 
}
