import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import AdapterItem from './AdapterItem';
import AdapterStatus from './AdapterStatus';
import GridBreak from './GridBreak';

export default function AdapterLayout(props) {
    
    const { devicesByCategory } = useContext(DataContext);
    const [adapterStatus, setAdapterStatus] = useState('');
    const [adapterName, setAdapterName] = useState('');
    const serverurl="https://"+window.location.hostname;
    const adapters = devicesByCategory('ADAPTER')
    
    function open(adapter) {
        window.open(adapters[adapter]['rest']['url'], '_'+adapter);
    }

    function restart(adapter) {
        setAdapterName(adapter)
        fetch(serverurl+"/restartadapter/"+adapter)
            .then(result=>result.text())
            .then(data=>setAdapterStatus(data))
    }
    
    function clearAdapterStatus() {
        setAdapterStatus("")
    }
    
    return (
        <React.Fragment>
            <GridBreak label={"Adapters"} />
            { adapterStatus &&
                <AdapterStatus status={adapterStatus} name={adapterName} clear={clearAdapterStatus} />
            }
            { adapters.map( adapter => 
                <AdapterItem key={adapter.endpointId} adapter={adapter} open={open} restart={restart} />
            )}
        </React.Fragment>
    )
}
