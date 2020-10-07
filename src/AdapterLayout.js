import React, { useState, useEffect, useContext } from "react";
import { DataContext } from './DataContext/DataProvider';

import AdapterItem from './AdapterItem';
import GridSection from './GridSection';

export default function AdapterLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices, directive } = useContext(DataContext);
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
