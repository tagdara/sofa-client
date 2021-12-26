import React from "react";
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import StackCard from 'components/StackCard'
import Television from 'devices/Television/Television';

const TvHero = props => {
    const tvs = endpointIdsByDisplayCategory('TV')

    return (
        <>
            { tvs.map(endpointId => 
                <StackCard key={ endpointId }>
                    <Television endpointId={ endpointId } />
                </StackCard>
            )}
        </>
    );
}

export default TvHero;