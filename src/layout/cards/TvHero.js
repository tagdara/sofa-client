import React from "react";
import { endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import StackCard from 'layout/components/StackCard'
import Television from 'devices/Television/Television';
import TelevisionAppleTv from 'devices/Television/TelevisionAppleTv'
import useLayoutStore from 'layout/layoutStore'

const TvHero = props => {
    const tvs = endpointIdsByDisplayCategory('TV')
    const appleTV = endpointIdByFriendlyName('Living Room Apple TV')
    const matrix = endpointIdByFriendlyName('Living Room TV')
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const hideCards = stackPullUp !== undefined

    return (
        <>
            { tvs.map(endpointId => 
                <StackCard key={ endpointId } hidden={props.hidden} >
                    <Television endpointId={ endpointId } appleTV={appleTV} matrix={matrix} />
                </StackCard>
            )}

            { (tvs && tvs.length) &&
                <TelevisionAppleTv hidden={hideCards} tvEndpointId={tvs[0]} endpointId={appleTV} />
            }

        </>
    );
}

export default TvHero;