import React from 'react';
import { selectPage } from 'store/layoutHelpers'
import { Group } from '@mantine/core';
import StackCard from 'beta/components/StackCard'
import Weather from 'beta/devices/Weather/Weather';
import AirQualityBadge from 'beta/device-model/instance/AirQualityBadge'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'

export default function OutdoorHero(props) {
    
    const aqEndpoint = endpointIdByFriendlyName(props.outdoorAirQuality)

    return (
        <StackCard>
            <Group direction="column">
                <Weather current={props.outdoor} forecast={"Rainmachine"} onClick={ () => selectPage('ThermostatLayout') } />  
                <AirQualityBadge endpointId={aqEndpoint} instance={"AQI"} prefix={"Outdoor AQI"} />
            </Group>
        </StackCard>
    ); 
}
