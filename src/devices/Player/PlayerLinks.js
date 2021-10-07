import React, { useState, useEffect, useContext } from 'react';
import { DeviceStateContext } from 'context/DeviceStateContext';
import PlayerVolume from './PlayerVolume';

import PlaceholderCard from 'layout/PlaceholderCard';

export default function PlayerLinks(props) {
    
    const { registerEndpointIds, cardReady, devices, deviceState, directive, unregisterDevices } = useContext(DeviceStateContext);
    const [speakers, setSpeakers]=useState([])
    
    useEffect(() => {
        setSpeakers(registerEndpointIds(props.links, 'PlayerLinks'))
        return function cleanup() {
            unregisterDevices('PlayerLinks');
        };
    // eslint-disable-next-line 
    }, [] )

    if (speakers.length>0 && !cardReady('PlayerLinks')) {
        return <PlaceholderCard count={ 1 } inset={true} />
    }

    return (
        <>
            { speakers.map( linkedplayer => (
                <PlayerVolume key={ linkedplayer } device={ devices[linkedplayer] } deviceState={ deviceState(linkedplayer) } directive={directive} />
            ))}
        </>
    );
}
