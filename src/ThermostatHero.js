import React, { useContext, useState, useEffect} from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Thermostat from './thermostat/Thermostat';
import AirQuality from './thermostat/AirQuality';
import PlaceholderCard from './PlaceholderCard';
export default function ThermostatHero(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { cardReady, devices, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);
    //const device = deviceStateByFriendlyName(props.Primary)
    //const aq = deviceStateByFriendlyName(props.airQuality)
    const [device, setDevice]=useState(undefined)
    const [aq, setAQ]=useState(undefined)
    
    useEffect(() => {
        setDevice(getEndpointIdsByFriendlyName(props.Primary, 'ThermostatHero'))
        setAQ(getEndpointIdsByFriendlyName(props.airQuality, 'ThermostatHero'))
        return function cleanup() {
            unregisterDevices('ThermostatHero');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('ThermostatHero')) {
        return <><PlaceholderCard /><PlaceholderCard count={2}/></>
    }

    return (
        <>
            <AirQuality device={ devices[aq] } deviceState={deviceStates[aq]} wide={props.wide } />
            <Thermostat device={ devices[device] } deviceState={deviceStates[device]} onClick={ () => applyLayoutCard('ThermostatLayout') } wide={props.wide } />
        </>
    ); 
}
