import React, {useEffect, useState} from "react";
import AdapterItem from 'devices/Adapter/AdminAdapterItem';
import PageFrame from 'layout/PageFrame'
import { tokenFetch } from 'network/tokenFetch'

export default function AdapterLayout(props) {

    const [ adapters, setAdapters] = useState({})

    useEffect(() => {
        tokenFetch('/activations')
            .then(result => setAdapters(result))

    // eslint-disable-next-line 
    }, [])    

    const restartAdapter = adapterName => {
        return tokenFetch('/activations/restart/'+adapterName)
    }

    if (!adapters || !adapters.hasOwnProperty('activated')) { return null }

    console.log('adapters', adapters)

    return (
        <PageFrame title={"Adapters"}>
            { adapters.activated.map( adapter => 
                <AdapterItem adapter={adapter} restartAdapter={restartAdapter} />
            )}
            { adapters.pending.map( adapter => 
                <AdapterItem adapter={adapter} restartAdapter={restartAdapter} />
            )}
        </PageFrame>
    )
}
