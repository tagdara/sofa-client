import React, { useContext } from "react";

import { DeviceContext } from 'context/DeviceContext';

import AppleTV from 'devices/AppleTV';
import PlaceholderCard from 'layout/PlaceholderCard';

export default function AppleTvHero(props) {

    const { devicesByCategory } = useContext(DeviceContext);
    const appleTVs = devicesByCategory('MEDIA_PLAYER')    

    if (!appleTVs) { return <PlaceholderCard count={ 1 } /> }
     
    return (
        <>
            { appleTVs.map(endpointId => 
                <AppleTV wide={ props.wide } key={ endpointId }  device={ endpointId } />
            )}
        </>
    );
}
