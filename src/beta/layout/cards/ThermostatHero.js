import React from 'react';

import Thermostat from 'beta/devices/Thermostat/Thermostat';
import PlaceholderCard from 'beta/layout/PlaceholderCard';

import { selectPage } from 'store/layoutHelpers'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'

const ThermostatHero = props => {
    const endpointId =  endpointIdByFriendlyName(props.primary)

    if (!endpointId) {
        return <PlaceholderCard count={2}/>
    }

    return (
        <Thermostat endpointId={endpointId} 
                    onClick={ () => selectPage('ThermostatLayout') } 
                    wide={props.wide } 
                />
    ); 
}

export default ThermostatHero;