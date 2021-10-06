import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceContext } from 'DataContext/DeviceProvider';

import Thermostat from 'devices/Thermostat/Thermostat';
import PlaceholderCard from 'layout/PlaceholderCard';

const ThermostatHero = props => {

    const { deviceByFriendlyName } = useContext(DeviceContext);
    const thermostat =  deviceByFriendlyName(props.primary)
    const { selectPage } = useContext(LayoutContext);
    
    if (!thermostat) {
        return <><PlaceholderCard /><PlaceholderCard count={2}/></>
    }

    return (
        <Thermostat endpointId={thermostat.endpointId} 
                    onClick={ () => selectPage('ThermostatLayout') } 
                    wide={props.wide } 
                />
    ); 
}

export default ThermostatHero;