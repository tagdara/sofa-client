import React from "react";

import { endpointIdsByDisplayCategory } from 'store/deviceHelpers';

import AdapterItem from 'devices/Adapter/AdapterItem';
import GridSection from 'components/GridSection';

export default function AdapterLayout(props) {

    const adapters = endpointIdsByDisplayCategory('ADAPTER')

    return (
        <GridSection name={"Adapters"} scroll={true}>
            { adapters.map( adapter => 
                <AdapterItem key={adapter} endpointId={adapter} />
            )}
        </GridSection>
    )
}
