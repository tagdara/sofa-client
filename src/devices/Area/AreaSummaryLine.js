import React from 'react';
import CardLineSlider from 'components/CardLineSlider';
import MultiLightColor from 'device-model/multidevice/MultiLightColor';

import { directive } from 'store/directive'
import { hasCapability, deviceByEndpointId } from 'store/deviceHelpers'
import { Group } from '@mantine/core'
import { useRegister } from 'store/useRegister'

const AreaSummaryLine = props => {

    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState) { return null }
    
    const children = deviceState.AreaController.children.value
    const shortcuts = deviceState.AreaController.shortcuts.value
    const colorLights = children.filter(endpointId => hasCapability(endpointId, "ColorController"))

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(shortcuts[level], 'SceneController', 'Activate')
    }
    
    if (shortcuts.length === 0 && colorLights.length===  0) { return null }

    const level = shortcuts.indexOf(deviceState.AreaController.scene.value);
    const levelLabels = shortcuts.map( (endpointId, index) => ( { value: index, label: deviceByEndpointId(endpointId).friendlyName  }))

    return (
        <Group spacing="xl" direction="row" noWrap style={{paddingLeft: "10%", paddingRight: "10%", width: "100%"}}>
            { (shortcuts.length > 0) &&
                <CardLineSlider on={true} delay={500} value={level} labels={levelLabels} marks={levelLabels} hideLabels max={shortcuts.length-1} change={runShortcut} />
            }
            { (colorLights.length > 0) &&
                <MultiLightColor endpointIds={colorLights} />
            }
        </Group>
    )

}

export default AreaSummaryLine;