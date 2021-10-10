import React, { useContext } from "react";

import { DeviceContext } from 'context/DeviceContext';

import AppleTV from 'devices/AppleTV/AppleTV';
import PlaceholderCard from 'layout/PlaceholderCard';

const AppleTvHero = props => {

    const { endpointIdsByCategory } = useContext(DeviceContext);
    const appleTVs = endpointIdsByCategory('MEDIA_PLAYER')    

    if (!appleTVs) { return <PlaceholderCard count={ 1 } /> }
     
    return (
        <>
            { appleTVs.map(endpointId => 
                <AppleTV wide={ props.wide } key={ endpointId }  device={ endpointId } />
            )}
        </>
    );
}

export default AppleTvHero
