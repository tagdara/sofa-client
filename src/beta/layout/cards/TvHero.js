import React from "react";

import { endpointIdsByDisplayCategory } from 'store/deviceHelpers';

import Television from 'beta/devices/Television/Television';

const TvHero = props => {
    const tvs = endpointIdsByDisplayCategory('TV')

    return (
        <>
            { tvs.map(endpointId => 
                <Television wide={props.wide} key={ endpointId } endpointId={ endpointId } />
            )}
        </>
    );
}

export default TvHero;