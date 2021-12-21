import React from "react";

import { sortByName, endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import AdapterItem from 'beta/devices/Adapter/AdapterItem';
import { PageFrame } from 'beta/components/PageFrame'

export default function AdapterLayout(props) {

    const adapters = endpointIdsByDisplayCategory('ADAPTER')
    const sortedAdapters = sortByName(adapters)

    return (
        <PageFrame title={"Adapters"}>
            { sortedAdapters.map( adapter => 
                <AdapterItem key={adapter} endpointId={adapter} />
            )}
        </PageFrame>
    )
}
