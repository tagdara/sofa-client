import React, { useEffect } from 'react';
import CardLineSlider from 'beta/components/CardLineSlider';
import { Group, Text } from '@mantine/core'
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'

const AreaLine = props => {

    const area = deviceByEndpointId(props.endpointId)   
    const areaState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'AreaLine-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'AreaLine-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])


    if (!areaState) { return null }
    
    const shortcuts = areaState.AreaController.shortcuts.value
    const scene = areaState.AreaController.scene.value
    const name = area.friendlyName

    function runShortcut(index) {
        const sceneId = shortcuts[index]
        if (sceneId !== scene) {
            console.log('should run', sceneId)
            directive(sceneId, 'SceneController', 'Activate')
        }
    }
    
    const level = shortcuts.indexOf(areaState.AreaController.scene.value);
    const levelLabels = shortcuts.map( (endpointId, index) => ( { value: index, label: deviceByEndpointId(endpointId).friendlyName  }))

    return (
        <Group position="apart" noWrap spacing={"lg"} style={{ width: "100%"}}>
            <Text weight={500} lineClamp={1} style={{ width: "40%" }} size="lg" onClick={ () => props.selectArea(props.endpointId)}>{name}</Text>
            { (shortcuts.length > 0) &&
                <CardLineSlider on={true} delay={500} value={level} labels={levelLabels} marks={levelLabels} hideLabels max={shortcuts.length-1} change={runShortcut} />
            }
        </Group>
    );
}

export default AreaLine