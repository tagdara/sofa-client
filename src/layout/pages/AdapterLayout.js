import React, { useState, useEffect, useContext } from "react";

import { DeviceStateContext } from 'context/DeviceStateContext';

import AdapterItem from 'devices/Adapter/AdapterItem';
import GridSection from 'components/GridSection';

export default function AdapterLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices, directive } = useContext(DeviceStateContext);
    const [ adapters, setAdapters]=useState([])

    useEffect(() => {
        setAdapters(getEndpointIdsByCategory('ADAPTER', 'AdapterLayout'))
        return function cleanup() {
            unregisterDevices('AdapterLayout');
        };
    // eslint-disable-next-line 
    }, [])

    
    return (
        cardReady('AdapterLayout') ?
        <GridSection name={"Adapters"} scroll={true}>
            { adapters.map( adapter => 
                <AdapterItem key={adapter} device={ devices[adapter] } deviceState={ deviceStates[adapter] } directive={directive} />
            )}
        </GridSection>
        :
        null
    )
}