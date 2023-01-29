import React from 'react';
import PullUpCard from 'layout/pullup/PullUpCard'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import useChildren from 'endpoint-model/property/children/useChildren'
import useShortcuts from 'endpoint-model/property/shortcuts/useShortcuts'
import AreaLights from 'devices/Area/AreaLights'
import AreaScenes from 'devices/Area/AreaScenes';
import AreaSummaryLine from 'devices/Area/AreaSummaryLine';
import { Divider } from '@mantine/core'

const AreaPullUp = props => {

    const name = friendlyNameByEndpointId(props.endpointId) 
    const { lights, scenes } = useChildren(props.endpointId)
    const { shortcuts } = useShortcuts(props.endpointId)

    return (      
        <PullUpCard name={name} title={ props.title ? props.title : name }  >
            <AreaSummaryLine endpointId={props.endpointId} />
            <Divider />
            <AreaScenes noShortcuts endpointId={props.endpointId} shortcuts={shortcuts} scenes={scenes} />
            <AreaLights lights={lights} prefix={name} />
        </PullUpCard>
    );

}

export default AreaPullUp 

