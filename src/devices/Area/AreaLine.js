import React from 'react';
import { Group, Text } from '@mantine/core'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import AreaShortcutSlider from 'devices/Area/AreaShortcutSlider'

const AreaLine = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <Group position="apart" noWrap spacing={"lg"} style={{ width: "100%"}}>
            <Text weight={500} lineClamp={1} style={{ flexShrink: 0, width: "40%" }} size="lg" onClick={ () => props.selectArea(props.endpointId)}>{name}</Text>
            <AreaShortcutSlider endpointId={props.endpointId} />
        </Group>
    );
}

export default AreaLine