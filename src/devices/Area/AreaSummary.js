import React, { useState } from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import AreaControlHeader from 'devices/Area/AreaControlHeader'
import AreaLine from 'devices/Area/AreaLine';
import AreaLights from 'devices/Area/AreaLights'
import AreaScenes from 'devices/Area/AreaScenes';
import AreaSummaryLine from 'devices/Area/AreaSummaryLine';

import useUserStore from 'store/userStore'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import { Group } from '@mantine/core'
import useChildren from 'device-model/property/children/useChildren'
import useScene from 'device-model/property/scene/useScene'
import useShortcuts from 'device-model/property/shortcuts/useShortcuts'

const AreaSummary = props => {

    const userArea = useUserStore( state => state.preferences.area)
    const homeArea = userArea ? userArea : "logic:area:Main"
    const [ currentArea, setCurrentArea ] = useState(homeArea)
    
    const name = friendlyNameByEndpointId(currentArea)
    const { areas, lights, scenes } = useChildren(currentArea)
    const { scene } = useScene(currentArea)
    const { shortcuts } = useShortcuts(currentArea)

    function expandArea(endpointId) {
        selectPage('AreaLayout', {"endpointId": endpointId})
    }

    return (
        <Group direction="column" noWrap spacing="xl">
            <AreaControlHeader name={ name } home={homeArea} currentArea={currentArea} selectArea={setCurrentArea} expand={expandArea} />
            <AreaSummaryLine endpointId={currentArea} />
            { areas.map(area =>
                <AreaLine key={area} endpointId={area} selectArea={setCurrentArea} />
            )}
            <AreaScenes noShortcuts shortcuts={shortcuts} scenes={scenes} current={scene} />
            <AreaLights lights={lights} prefix={name} />
        </Group>
    );
}

export default AreaSummary
