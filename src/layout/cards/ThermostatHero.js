import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import Thermostat from 'devices/Thermostat/Thermostat';
import PlaceholderCard from 'layout/PlaceholderCard';

import { endpointIdByFriendlyName } from 'store/deviceHelpers'

const ThermostatHero = props => {
    const endpointId =  endpointIdByFriendlyName(props.primary)
    const { selectPage } = useContext(LayoutContext);

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