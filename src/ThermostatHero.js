import React, { useContext, useState, useEffect} from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Thermostat from './thermostat/Thermostat';
import TemperatureSensor from './thermostat/TemperatureSensor';
import AirQuality from './thermostat/AirQuality';
import PlaceholderCard from './PlaceholderCard';
export default function ThermostatHero(props) {
    
    const { selectPage } = useContext(LayoutContext);
    const { cardReady, devices, deviceState, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);
    //const device = deviceStateByFriendlyName(props.Primary)
    //const aq = deviceStateByFriendlyName(props.airQuality)
    const [device, setDevice]=useState(undefined)
    const [aq, setAQ]=useState(undefined)
    const [outdoor, setOutdoor]=useState(undefined)
    
    useEffect(() => {
        setDevice(getEndpointIdsByFriendlyName(props.Primary, 'ThermostatHero'))
        setAQ(getEndpointIdsByFriendlyName(props.airQuality, 'ThermostatHero'))
        setOutdoor(getEndpointIdsByFriendlyName(props.outdoor, 'ThermostatHero'))
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
            <TemperatureSensor device={ devices[outdoor] } deviceState={deviceState(outdoor)} onClick={ () => selectPage('ThermostatLayout') } wide={props.wide } />
            <Thermostat device={ devices[device] } deviceState={deviceState(device)} onClick={ () => selectPage('ThermostatLayout') } wide={props.wide } />
            <AirQuality device={ devices[aq] } deviceState={deviceState(aq)} wide={props.wide } />
        </>
    ); 
}
