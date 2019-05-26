import React from 'react';
import { useState, useEffect } from 'react';

import AdapterItem from './AdapterItem';
import AdapterDown from './AdapterDown';

import AdapterStatus from './AdapterStatus';
import GridBreak from './GridBreak';
import ReplayIcon from '@material-ui/icons/Replay';

export default function AdapterLayout(props) {

    const [adapters, setAdapterList] = useState({});
    const [adapterStatus, setAdapterStatus] = useState('');
    const [adapterName, setAdapterName] = useState('');
    
    useEffect(() => {
        fetch('/list/servicemanager/adapters')
            .then(result=>result.json())
            .then(data=>setAdapterList(data['adapters']))
    }, []);
    
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
    
    function refreshAdapterStatus() {
        console.log('refreshing adapter status')
        fetch('/list/servicemanager/adapters')
            .then(result=>result.json())
            .then(data=>setAdapterList(data['adapters']))
        
    }
    
    return (
        <React.Fragment>
            <GridBreak label={"Adapters"}>
                <ReplayIcon onClick={ ()=> refreshAdapterStatus() }/>
            </GridBreak>
            { adapterStatus &&
                <AdapterStatus status={adapterStatus} name={adapterName} clear={clearAdapterStatus} />
            }
            { Object.keys(adapters).sort().map( name => (
                adapters[name].hasOwnProperty('rest') &&  adapters[name].rest.hasOwnProperty('startup')?
                    <AdapterItem key={name} name={ name } adapterdata={ adapters[name] } address={ adapters[name].rest.address } port={ adapters[name].rest.port } 
                        startup={ adapters[name].rest.startup } url={ adapters[name].rest.url } 
                        open={open} restart={restart} />
                    :
                    <AdapterDown key={name} name={name} restart={restart} />
            ))}
        </React.Fragment>
    )
}
