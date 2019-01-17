import React from 'react';
import { useState, useEffect } from 'react';
import { withLayout } from './DataContext/withLayout';

import AdapterItem from './AdapterItem';
import AdapterStatus from './AdapterStatus';

function AdapterLayout(props) {

    const [adapters, setAdapterList] = useState({});
    const [adapterStatus, setAdapterStatus] = useState('');
    const [adapterName, setAdapterName] = useState('');
    
    useEffect(() => {
        fetch('/adapters')
            .then(result=>result.json())
            .then(data=>setAdapterList(data))
    }, []);
    
    function open(adapter) {
        var win = window.open(adapters[adapter]['url'], '_'+adapter);
    }

    function restart(adapter) {
        setAdapterName(adapter)
        fetch("/restartadapter/"+adapter)
            .then(result=>result.text())
            .then(data=>setAdapterStatus(data))
    }
    
    return (
        <React.Fragment>
            <AdapterStatus status={adapterStatus} name={adapterName} />
            { Object.keys(adapters).map(name => 
                <AdapterItem key={name} name={ name } address={ adapters[name]['address'] } port={ adapters[name]['port'] } 
                    startup={ adapters[name]['startup'] } setLayoutCard={props.setLayoutCard} url={ adapters[name]['url'] } 
                    open={open} restart={restart} />
            )}
        </React.Fragment>
    )
}

export default withLayout(AdapterLayout)