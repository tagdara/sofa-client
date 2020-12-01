import React, { useContext, useState, useEffect} from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Thermostat from './thermostat/Thermostat';
import PlaceholderCard from './PlaceholderCard';


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
