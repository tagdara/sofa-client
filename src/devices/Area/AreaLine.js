import React from 'react';
import CardLineSlider from 'components/CardLineSlider';
import { Group, Text } from '@mantine/core'
import { directive } from 'store/directive'
import { deviceByEndpointId } from 'store/deviceHelpers'
import { useRegister } from 'store/useRegister'

const AreaLine = props => {

    const { device, deviceState } = useRegister(props.endpointId)
    if (!deviceState) { return null }
    
    const shortcuts = deviceState.AreaController.shortcuts.value
    const scene = deviceState.AreaController.scene.value
    const name = device.friendlyName

    function runShortcut(index) {
        const sceneId = shortcuts[index]
        if (sceneId !== scene) {
            console.log('should run', sceneId)
            directive(sceneId, 'SceneController', 'Activate')
        }
    }
    
    const level = shortcuts.indexOf(deviceState.AreaController.scene.value);
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