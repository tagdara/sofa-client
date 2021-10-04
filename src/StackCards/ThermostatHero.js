import React, { useContext, useState, useEffect} from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { DataContext } from 'DataContext/DataProvider';

import Thermostat from 'devices/Thermostat/Thermostat';
import PlaceholderCard from 'layout/PlaceholderCard';


export default function ThermostatHero(props) {

    const { selectPage } = useContext(LayoutContext);
    const { cardReady, devices, deviceState, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);
    const [device, setDevice]=useState(undefined)

    useEffect(() => {
        setDevice(getEndpointIdsByFriendlyName(props.primary, 'ThermostatHero'+props.primary)[0])
        return function cleanup() {
            unregisterDevices('ThermostatHero'+props.primary);
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('ThermostatHero'+props.primary)) {
        return <><PlaceholderCard /><PlaceholderCard count={2}/></>
    }

    return (
        <Thermostat device={ devices[device] } deviceState={deviceState(device)} onClick={ () => selectPage('ThermostatLayout') } wide={props.wide } />
    ); 
}
