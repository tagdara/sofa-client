import React from 'react';
import MultiLightColor from 'endpoint-model/multidevice/MultiLightColor';
import { Group } from '@mantine/core'

import useChildren from 'endpoint-model/property/children/useChildren'
import AreaShortcutSlider from 'devices/Area/AreaShortcutSlider'

const AreaSummaryLine = props => {

    const { lights } = useChildren(props.endpointId)

    if ( !lights || lights.length < 1 ) { return null }
    
    return (
        <Group spacing="xl" noWrap style={{paddingLeft: "10%", paddingRight: "10%", width: "100%"}}>
            <AreaShortcutSlider endpointId={props.endpointId} />
            <MultiLightColor endpointIds={lights} />
        </Group>
    )

}

export default AreaSummaryLine;