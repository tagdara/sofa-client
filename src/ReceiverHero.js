import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import Receiver from './devices/receiver';

export default function ReceiverHero(props) {
    
    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const [receivers, setReceivers]=useState([])
    
    useEffect(() => {
        setReceivers(getEndpointIdsByCategory('RECEIVER','ReceiverHero'))
        return function cleanup() {
            unregisterDevices('ReceiverHero');
        };
    // eslint-disable-next-line 
    }, [ ] )

    return (
        cardReady('ReceiverHero') ?
        <>
            { receivers.map( endpointId => 
                <Receiver endpointId={endpointId} wide={props.wide} key={endpointId} device={ devices[endpointId] } deviceState={ deviceStates[endpointId] } />
            )}
        </>
        : null
    );
    
}
