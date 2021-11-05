import React from 'react';

import Thermostat from 'devices/Thermostat/Thermostat';
import PlaceholderCard from 'layout/PlaceholderCard';

import { selectPage } from 'store/layoutHelpers'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'

const ThermostatHero = props => {
    const endpointId =  endpointIdByFriendlyName(props.primary)

    if (!endpointId) {
        return <><PlaceholderCard /><PlaceholderCard count={2}/></>
    }

    return (
        <Thermostat endpointId={endpointId} 
                    onClick={ () => selectPage('ThermostatLayout') } 
                    wide={props.wide } 
                />
    ); 
}

export default ThermostatHero;