import React from 'react';
import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'
import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'
import Endpoint from 'endpoint-model/endpoint/Endpoint'
import { sortByName } from 'endpoint-model/discovery'

const EndpointLayout = props => {

    const devicesDict = useDiscoveryStore.getState().devices

    if (!devicesDict ) { return null }
    console.log(devicesDict)

    const endpointIds = sortByName(Object.keys(devicesDict))

    return (    
        <PageFrame>
            <SectionHeader title={"All Endpoints"} />
            <SectionFrame>
                <SectionGrid>
                { endpointIds.map( endpointId =>
                    <Endpoint key={ endpointId } endpointId={endpointId} />
                )}
                </SectionGrid>
            </SectionFrame>
        </PageFrame>
    )
}

export default EndpointLayout;
