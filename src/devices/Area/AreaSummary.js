import React, { useState } from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import AreaControlHeader from 'devices/Area/AreaControlHeader'
import AreaLine from 'devices/Area/AreaLine';
import AreaLights from 'devices/Area/AreaLights'
import AreaScenes from 'devices/Area/AreaScenes';
import AreaSummaryLine from 'devices/Area/AreaSummaryLine';

import useUserStore from 'user/userStore'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { Stack } from '@mantine/core'
import useChildren from 'endpoint-model/property/children/useChildren'
import useShortcuts from 'endpoint-model/property/shortcuts/useShortcuts'

const AreaSummary = props => {

    const userArea = useUserStore( state => state.preferences.area)
    const homeArea = userArea ? userArea : "area:Main"
    const [ currentArea, setCurrentArea ] = useState(homeArea)
    
    const name = friendlyNameByEndpointId(currentArea)
    const { areas, lights, scenes } = useChildren(currentArea)
    const { shortcuts } = useShortcuts(currentArea)

    function expandArea(endpointId) {
        selectPage('AreaLayout', {"endpointId": endpointId})
    }

    return (
        <Stack spacing="lg">
            <AreaControlHeader name={ name } home={homeArea} currentArea={currentArea} selectArea={setCurrentArea} expand={expandArea} />
            <AreaSummaryLine endpointId={currentArea} />
            { areas.map(area =>
                <AreaLine key={area} endpointId={area} selectArea={setCurrentArea} />
            )}
            <AreaScenes noShortcuts endpointId={currentArea} shortcuts={shortcuts} scenes={scenes} />
            <AreaLights lights={lights} prefix={name} />
        </Stack>
    );
}

export default AreaSummary
