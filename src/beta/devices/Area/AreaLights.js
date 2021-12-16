import React from 'react';
import LightLine from 'beta/devices/Light/LightLine';
import { sortByName, hasDisplayCategory } from 'store/deviceHelpers'
import { Group, Text } from '@mantine/core'

const AreaLights = props => {

    const area = props.device
    const areaState = props.deviceState

    if (!area || !areaState ) { return null }

    const children = sortByName(areaState.AreaController.children.value)
    const name = area.friendlyName
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))

    if (!lights || lights.length<1 ) { return null }

    return (
        <Group direction="column" noWrap grow style={{ width: "100%"}} spacing="xs">
            <Text>Lights</Text>
            { lights.map(light =>
                <LightLine key={light} endpointId={light} skipPrefix={name} />
            )}
        </Group>
    );

}

export default AreaLights
