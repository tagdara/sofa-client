import React from 'react';
import LightButton from 'beta/devices/Light/LightButton';
import { sortByName, hasDisplayCategory } from 'store/deviceHelpers'
import { Group, Text } from '@mantine/core'

const AreaLights = props => {

    const area = props.device
    const areaState = props.deviceState

    const children = sortByName(areaState.AreaController.children.value)
    const name = area.friendlyName
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))

    if (!lights || lights.length<1 ) { return null }

    return (
        <Group direction="column" noWrap grow style={{ width: "100%"}}>
            <Text>Lights</Text>
            { lights.map(light =>
                <LightButton endpointId={light} skipPrefix={name} />
            )}
        </Group>
    );

}

export default AreaLights
