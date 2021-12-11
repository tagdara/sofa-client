import React, { useEffect } from 'react';
import CardLineSlider from 'beta/components/CardLineSlider';
import MultiLightColor from 'beta/devices/Light/MultiLightColor';

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { hasCapability, deviceByEndpointId, register, unregister } from 'store/deviceHelpers'
import { Group } from '@mantine/core'

const AreaSummaryLine = props => {
    
    const areaState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'AreaSummaryLine-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'AreaSummaryLine-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!areaState) { return null }
    
    const children = areaState.AreaController.children.value
    const shortcuts = areaState.AreaController.shortcuts.value
    const colorLights = children.filter(endpointId => hasCapability(endpointId, "ColorController"))

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(shortcuts[level], 'SceneController', 'Activate')
    }
    
    if (shortcuts.length === 0 && colorLights.length===  0) { return null }

    const level = shortcuts.indexOf(areaState.AreaController.scene.value);
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