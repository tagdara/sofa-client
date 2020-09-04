import React, { useState, useEffect, useContext } from "react";
import { DataContext } from './DataContext/DataProvider';

import AdapterItem from './AdapterItem';
import AdapterStatus from './AdapterStatus';
import GridSection from './GridSection';

export default function AdapterLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices, directive } = useContext(DataContext);
    const [ adapters, setAdapters]=useState([])
    const [ adapterStatus, setAdapterStatus ]=useState([])

    useEffect(() => {
        setAdapters(getEndpointIdsByCategory('ADAPTER', 'AdapterLayout'))
        return function cleanup() {
            unregisterDevices('AdapterLayout');
        };
    // eslint-disable-next-line 
    }, [])

    function clearAdapterStatus() {
        setAdapterStatus("")
    }
    
    return (
        cardReady('AdapterLayout') ?
        <GridSection name={"Adapters"} scroll={true}>
            { adapterStatus &&
                <AdapterStatus status={adapterStatus} name={''} clear={clearAdapterStatus} />
            }
            { adapters.map( adapter => 
                <AdapterItem key={adapter} device={ devices[adapter] } deviceState={ deviceStates[adapter] } directive={directive} />
            )}
        </GridSection>
        :
        null
    )
}
