import React, { useContext, useState, useEffect} from 'react';

import { DataContext } from 'DataContext/DataProvider';

import AirQuality from 'devices/Thermostat/AirQuality';
import PlaceholderCard from 'layout/PlaceholderCard';

export default function AirQualityHero(props) {
    
    const { cardReady, devices, deviceState, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);
    const [ indoorAQ, setIndoorAQ ]=useState(undefined)
    const [ outdoorAQ, setOutdoorAQ ]=useState(undefined)

    useEffect(() => {
        var iaq=getEndpointIdsByFriendlyName(props.indoorAirQuality, 'AQHero')
        console.log(iaq)
        var oaq=getEndpointIdsByFriendlyName(props.outdoorAirQuality, 'AQHero')
        console.log(oaq)
        
        setIndoorAQ(iaq)
        setOutdoorAQ(oaq)

        return function cleanup() {
            unregisterDevices('AQHero');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('AQHero')) {
        return <PlaceholderCard />
    }

    return (
        <AirQuality indoorDevice={ devices[indoorAQ] } indoorDeviceState={deviceState(indoorAQ)} 
                    outdoorDevice={ devices[outdoorAQ] } outdoorDeviceState={deviceState(outdoorAQ)} 
            wide={props.wide } />
    ); 
}
