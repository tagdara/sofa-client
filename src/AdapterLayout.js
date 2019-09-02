import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';

import AdapterItem from './AdapterItem';
import AdapterDown from './AdapterDown';

import AdapterStatus from './AdapterStatus';
import GridBreak from './GridBreak';
import ReplayIcon from '@material-ui/icons/Replay';

function AdapterLayout(props) {


    const [adapterStatus, setAdapterStatus] = useState('');
    const [adapterName, setAdapterName] = useState('');
    
    const adapters = props.devicesByCategory('ADAPTER')

    console.log('Adapters',adapters)
    function open(adapter) {
        var win = window.open(adapters[adapter]['rest']['url'], '_'+adapter);
    }

    function restart(adapter) {
        setAdapterName(adapter)
        fetch("/restartadapter/"+adapter)
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
                <AdapterItem key={adapter.endpointId} adapter={adapter} adapterstate={props.deviceProperties[adapter.endpointId]} open={open} restart={restart} />
            )}
        </React.Fragment>
    )
}

export default withData(AdapterLayout);
