import React from "react";
import { endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import StackCard from 'components/StackCard'
import Television from 'devices/Television/Television';
import TelevisionLightControls from 'devices/Television/TelevisionLightControls'
import TelevisionAppleTv from 'devices/Television/TelevisionAppleTv'

const TvHero = props => {
    const tvs = endpointIdsByDisplayCategory('TV')
    const appleTV = endpointIdByFriendlyName('Living Room Apple TV')
    const matrix = endpointIdByFriendlyName('Living Room TV')

    return (
        <>
            { tvs.map(endpointId => 
                <StackCard key={ endpointId }>
                    <Television endpointId={ endpointId } appleTV={appleTV} matrix={matrix} />
                </StackCard>
            )}

            { (tvs && tvs.length) &&
                <TelevisionAppleTv tvEndpointId={tvs[0]} endpointId={appleTV} />
            }

            { (tvs && tvs.length) &&
                <TelevisionLightControls endpointId={tvs[0]} />
            }
        </>
    );
}

export default TvHero;