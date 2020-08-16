import React, { useState, useEffect, useContext } from "react";
import Television from './devices/Television';
import { DataContext } from './DataContext/DataProvider';

export default function TvHero(props) {
 
    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    //const tvs= deviceStatesByCategory('TV')
    const [tvs, setTvs]=useState([])
    
    useEffect(() => {
        setTvs(getEndpointIdsByCategory('TV', 'TvHero'))
        return function cleanup() {
            unregisterDevices('TvHero');
        };
    // eslint-disable-next-line 
    }, [])
     
    return (
        cardReady('TvHero') ?
        <>
            { tvs.map(tv => 
                <Television wide={props.wide} key={tv}  device={ devices[tv] } deviceState={ deviceStates[tv] } />
            )}
        </>
        :
        null
    );
}
