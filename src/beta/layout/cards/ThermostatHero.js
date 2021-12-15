import React from 'react';

import Thermostat from 'beta/devices/Thermostat/Thermostat';
import AirQualityBadge from 'beta/device-model/instance/AirQualityBadge'
import PlaceholderCard from 'beta/layout/PlaceholderCard';

import { selectPage } from 'store/layoutHelpers'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'
import StackCard from 'beta/components/StackCard'

const ThermostatHero = props => {
    const endpointId =  endpointIdByFriendlyName(props.primary)
    const indoorAQ = endpointIdByFriendlyName(props.indoorAirQuality)  

    if (!endpointId) {
        return <PlaceholderCard count={2}/>
    }

    return (
        <StackCard>
            <Thermostat endpointId={endpointId} 
                    onClick={ () => selectPage('ThermostatLayout') } 
                    wide={props.wide } 
            >
                <AirQualityBadge size="nd" endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
            </Thermostat>
        </StackCard>
    ); 
}

export default ThermostatHero;