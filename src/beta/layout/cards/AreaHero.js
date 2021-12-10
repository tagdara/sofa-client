import React, { useEffect, useState } from 'react';
import { selectPage } from 'store/layoutHelpers'
import StackCard from 'beta/components/StackCard'
import AreaControlHeader from 'beta/devices/Area/AreaControlHeader'
import AreaLine from 'beta/devices/Area/AreaLine';
import AreaLights from 'beta/devices/Area/AreaLights'
import AreaScenes from 'beta/devices/Area/AreaScenes';
import AreaSummaryLine from 'beta/devices/Area/AreaSummaryLine';

import PlaceholderCard from 'beta/layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'
import useUserStore from 'store/userStore'
import { sortByName, hasCapability, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { Group } from '@mantine/core'

const AreaHero = props => {

    const userArea = useUserStore( state => state.preferences.area)
    const [ currentArea, setCurrentArea ] = useState('logic:area:Main')

    const area = deviceByEndpointId(currentArea)
    const areaState = useDeviceStateStore( state => state.deviceStates[currentArea] )

    useEffect(() => {
        register(currentArea, 'AreaHero')
        return function cleanup() {
            unregister(currentArea, 'AreaHero')
        };
    // eslint-disable-next-line 
    }, [currentArea])


    if (!areaState ) { return <PlaceholderCard count={ 6 } /> }
    const children = sortByName(areaState.AreaController.children.value)
    const name = area.friendlyName
    const areas = children.filter(endpointId => hasCapability(endpointId, "AreaController"))
    const homeArea = userArea ? userArea : "logic:area:Main"

    function selectArea(endpointId) {
        setCurrentArea(endpointId)
    }

    function expandArea(endpointId) {
        selectPage('AreaLayout', {"endpointId": endpointId})
    }

    return (
        <StackCard>
            <Group direction="column" noWrap spacing="xl">
                <AreaControlHeader name={ name } home={homeArea} currentArea={currentArea} selectArea={selectArea} expand={expandArea} />
                <AreaSummaryLine endpointId={currentArea} />
                { areas.map(area =>
                    <AreaLine key={area} endpointId={area} selectArea={selectArea} />
                )}
                <AreaScenes noShortcuts deviceState={areaState} />
                <AreaLights device={area} deviceState={areaState} />
            </Group>
        </StackCard>
    );
}

export default AreaHero
