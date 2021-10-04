import React, { useState, useEffect, useContext } from "react";

import { DataContext } from 'DataContext/DataProvider';

import AppleTV from 'devices/AppleTV';
import PlaceholderCard from 'layout/PlaceholderCard';

export default function AppleTvHero(props) {
 
    const { cardReady, cardDevices, devices, deviceState, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const [ appleTVs, setAppleTVs ]=useState([])
    
    useEffect(() => {
        setAppleTVs(getEndpointIdsByCategory('MEDIA_PLAYER', 'AppleTvHero'))
        return function cleanup() {
            unregisterDevices('AppleTvHero');
        };
    // eslint-disable-next-line 
    }, [])
    
    if (!cardReady('AppleTvHero')) {
        return <PlaceholderCard count={ cardDevices } />
    }
     
    return (
        <>
        {
        appleTVs.map(atv => 
            <AppleTV wide={props.wide} key={atv}  device={ devices[atv] } deviceState={ deviceState(atv) } />
        )
        }
        </>
    );
}
