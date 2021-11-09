import React, { useEffect } from 'react';
import CardLine from 'components/CardLine'
import LevelSlider from 'components/LevelSlider';
import MultiLightColor from 'devices/Light/MultiLightColor';

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { hasCapability, register, unregister } from 'store/deviceHelpers'

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
    const scene = areaState.AreaController.scene.value
    const colorLights = children.filter(endpointId => hasCapability(endpointId, "ColorController"))

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(shortcuts[level], 'SceneController', 'Activate')
    }
    
    if (shortcuts.length === 0 && colorLights.length===  0) { return null }

    return (
        <CardLine>
            { (shortcuts.length > 0) &&
                <LevelSlider levels={shortcuts} level={scene} select={runShortcut} />
            }
            { (colorLights.length > 0) &&
                <MultiLightColor endpointIds={colorLights} />
            }
        </CardLine>
    )

}

export default AreaSummaryLine;