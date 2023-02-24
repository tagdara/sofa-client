import React, {useEffect, useState} from "react";
import AdapterItem from 'devices/Adapter/AdminAdapterItem';
import PageFrame from 'layout/PageFrame'
import SectionFrame from 'layout/section/SectionFrame'
import { tokenFetch } from 'network/tokenFetch'
import { Stack } from '@mantine/core';

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

    var sortedActivated = adapters.activated.sort((a, b) => a.name > b.name ? 1 : -1);
    var sortedPending = []; // adapters.pending.sort((a, b) => a.name > b.name ? 1 : -1);

    return (
        <PageFrame title={"Adapters"}>
            <SectionFrame>
                <Stack style={{ maxWidth: 480 }}>
                    { sortedActivated.map( adapter => 
                        <AdapterItem adapter={adapter} key={adapter.name} restartAdapter={restartAdapter} />
                    )}
                    { sortedPending.map( adapter => 
                        <AdapterItem adapter={adapter} key={adapter.name} restartAdapter={restartAdapter} />
                    )}
                </Stack>
            </SectionFrame>
        </PageFrame>
    )
}
