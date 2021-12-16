import React from "react";

import { endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import AdapterItem from 'beta/devices/Adapter/AdapterItem';
import PageFrame from 'beta/components/PageFrame'
import SectionHeader from 'beta/components/SectionHeader';
import { Group } from '@mantine/core'

export default function AdapterLayout(props) {

    const adapters = endpointIdsByDisplayCategory('ADAPTER')

    return (
        <Group direction="column">
            <SectionHeader title={"Adapters"} />
            <PageFrame>
                { adapters.map( adapter => 
                    <AdapterItem key={adapter} endpointId={adapter} />
                )}
            </PageFrame>
        </Group>
    )
}
