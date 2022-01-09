import React from "react";
import { endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import StackCard from 'components/StackCard'
import Television from 'devices/Television/Television';

const TvHero = props => {
    const tvs = endpointIdsByDisplayCategory('TV')
    const appleTV = endpointIdByFriendlyName('Living Room Apple TV')

    return (
        <>
            { tvs.map(endpointId => 
                <StackCard key={ endpointId }>
                    <Television endpointId={ endpointId } appleTV={appleTV} />
                </StackCard>
            )}
        </>
    );
}

export default TvHero;