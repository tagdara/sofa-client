import React from 'react';
import { Group } from '@mantine/core'
import useChildren from 'device-model/property/children/useChildren'
import AreaLightsOnBadge from 'devices/Area/AreaLightsOnBadge'

const AreasLightsOn = props => {

    const currentArea = "logic:area:all"
    const { areas } = useChildren(currentArea)
    
    return (
        <Group spacing="xs">
            { areas.map(area =>
                <AreaLightsOnBadge key={area} endpointId={area} />
            )}
        </Group>
    );
}

export default AreasLightsOn 
