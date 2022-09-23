import React, { useState } from 'react';
import StackCard from 'layout/components/StackCard'
import AreaLine from 'devices/Area/AreaLine';
import AreaLights from 'devices/Area/AreaLights'
import AreaScenes from 'devices/Area/AreaScenes';
import PlaceholderCard from 'layout/PlaceholderCard';
import useAreaController from 'endpoint-model/controller/AreaController/useAreaController'
import { Stack } from '@mantine/core'

const SubAreaHero = props => {

    const [ currentArea, setCurrentArea ] = useState(props.area)   
    const { children, areas, lights, scenes } = useAreaController(currentArea)

    if (!children ) { return <PlaceholderCard count={ 6 } /> }

    function selectArea(endpointId) {
        setCurrentArea(endpointId)
    }

    return (
        <StackCard>
            <Stack spacing="xl">
                { areas.map(area =>
                    <AreaLine key={area} endpointId={area} selectArea={selectArea} />
                )}
                <AreaScenes noShortcuts scenes={scenes} />
                <AreaLights lights={lights} />
            </Stack>
        </StackCard>
    );
}

export default SubAreaHero
