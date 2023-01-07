import React from 'react';
import StackCard from 'layout/components/StackCard'
import Weather from 'devices/Weather/Weather';
import { Stack } from '@mantine/core';
import { endpointIdByFriendlyName, friendlyNameByEndpointId } from 'endpoint-model/discovery'
import usePullUp from 'layout/pullup/usePullUp'
import WeatherPullUp from 'devices/Weather/WeatherPullUp'

export default function OutdoorHero(props) {
    
    const forecast = "Rainmachine" // should be added to props
    const name = friendlyNameByEndpointId(props.weatherEndpointId) 
    const forecastEndpointId = endpointIdByFriendlyName(forecast)
    const { pullUpActive, showPullUp } = usePullUp(name)

    return (
        <>
            <StackCard>
                <Stack style={{ width: "100%"}} onClick={showPullUp  } >
                    <Weather    
                        airQualityEndpointId={props.airQualityEndpointId} 
                        current={props.weatherEndpointId} 
                        forecastEndpointId={forecastEndpointId} 
                    />  
                </Stack>
            </StackCard>
            <WeatherPullUp opened={pullUpActive} endpointId={props.weatherEndpointId} />
        </>
    ); 
}
