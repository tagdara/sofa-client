import React from "react";

import { endpointIdsByDisplayCategory } from 'store/deviceHelpers'

import AppleTV from 'devices/AppleTV/AppleTV';
import PlaceholderCard from 'layout/PlaceholderCard';

const AppleTvHero = props => {

    const appleTVs = endpointIdsByDisplayCategory('MEDIA_PLAYER')    

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
