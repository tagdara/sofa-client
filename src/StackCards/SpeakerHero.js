import React, { useState, useEffect, useContext } from 'react';

import { DataContext } from 'DataContext/DataProvider';
import Speaker from 'devices/Speaker/Speaker';
import PlaceholderCard from 'layout/PlaceholderCard';
import CardBase from 'components/CardBase'

export default function ReceiverHero(props) {
    
    const { cardReady, devices, deviceState, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const [ speakers, setSpeakers]=useState([])
    
    useEffect(() => {
        setSpeakers(getEndpointIdsByCategory('SPEAKER','SpeakerHero'))
        return function cleanup() {
            unregisterDevices('SpeakerHero');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('SpeakerHero')) {
        return <PlaceholderCard count={1} />
    }

    return (
        <CardBase>
            { speakers.map( endpointId => 
                <Speaker endpointId={endpointId} wide={props.wide} key={endpointId} device={ devices[endpointId] } deviceState={ deviceState(endpointId) } />
            )}
        </CardBase>
    )
}
