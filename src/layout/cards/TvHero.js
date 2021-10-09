import React, { useContext } from "react";

import { DeviceContext } from 'context/DeviceContext';

import Television from 'devices/Television/Television';

const TvHero = props => {
    const { endpointIdsByCategory } = useContext(DeviceContext);
    const tvs = endpointIdsByCategory('TV')

    return (
        <>
            { tvs.map(endpointId => 
                <Television wide={props.wide} key={ endpointId } endpointId={ endpointId } />
            )}
        </>
    );
}

export default TvHero;