import React, { useContext, useState, useEffect} from 'react';
import { DataContext } from './DataContext/DataProvider';

import AirQuality from './thermostat/AirQuality';
import PlaceholderCard from './PlaceholderCard';

export default function AirQualityHero(props) {
    
    const { cardReady, devices, deviceState, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);
    const [ aq, setAQ ]=useState(undefined)

    useEffect(() => {
        setAQ(getEndpointIdsByFriendlyName(props.airQuality, 'AQHero'))
        return function cleanup() {
            unregisterDevices('AQHero');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('AQHero')) {
        return <PlaceholderCard />
    }

    return (
        <AirQuality device={ devices[aq] } deviceState={deviceState(aq)} wide={props.wide } />
    ); 
}
