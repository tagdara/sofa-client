import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import AdapterItem from './AdapterItem';
import AdapterStatus from './AdapterStatus';
import GridBreak from './GridBreak';

export default function AdapterLayout(props) {
    
    const { deviceStatesByCategory, directive} = useContext(DataContext);
    const [adapterStatus, setAdapterStatus] = useState('');
    const adapters = deviceStatesByCategory('ADAPTER')
    
    function clearAdapterStatus() {
        setAdapterStatus("")
    }
    
    return (
        <React.Fragment>
            <GridBreak label={"Adapters"} />
            { adapterStatus &&
                <AdapterStatus status={adapterStatus} name={''} clear={clearAdapterStatus} />
            }
            { adapters.map( adapter => 
                <AdapterItem key={adapter.endpointId} adapter={adapter} directive={directive} />
            )}
        </React.Fragment>
    )
}
