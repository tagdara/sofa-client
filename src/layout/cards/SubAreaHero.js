import React, { useEffect, useState } from 'react';
import StackCard from 'components/StackCard'
import AreaLine from 'devices/Area/AreaLine';
import AreaLights from 'devices/Area/AreaLights'
import AreaScenes from 'devices/Area/AreaScenes';
import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'

import { sortByName, hasCapability, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { Stack } from '@mantine/core'

const SubAreaHero = props => {

    const [ currentArea, setCurrentArea ] = useState(props.area)
    const area = deviceByEndpointId(currentArea)
    const areaState = useDeviceStateStore( state => state.deviceStates[currentArea] )

    useEffect(() => {
        register(currentArea, 'SubAreaHero')
        return function cleanup() {
            unregister(currentArea, 'SubAreaHero')
        };
    // eslint-disable-next-line 
    }, [currentArea])


    if (!areaState ) { return <PlaceholderCard count={ 6 } /> }
    const children = sortByName(areaState.AreaController.children.value)
    const areas = children.filter(endpointId => hasCapability(endpointId, "AreaController"))

    function selectArea(endpointId) {
        setCurrentArea(endpointId)
    }

    return (
        <StackCard>
            <Stack spacing="xl">
                { areas.map(area =>
                    <AreaLine key={area} endpointId={area} selectArea={selectArea} />
                )}
                <AreaScenes noShortcuts deviceState={areaState} />
                <AreaLights device={area} deviceState={areaState} />
            </Stack>
        </StackCard>
    );
}

export default SubAreaHero
