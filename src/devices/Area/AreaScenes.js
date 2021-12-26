import React from 'react';
import SceneItem from 'devices/Scene/SceneItem';
import { sortByName, hasDisplayCategory } from 'store/deviceHelpers'
import { Group, Text } from '@mantine/core'

const AreaScenes = props => {

    const areaState = props.deviceState
    const children = sortByName(areaState.AreaController.children.value)
    const shortcuts = areaState.AreaController.shortcuts.value
    const currentScene = areaState.AreaController.scene.value
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))
    const nonShortcuts = scenes.filter(endpointId => !shortcuts.includes(endpointId))

    function shortcutId(scene) {
        if (shortcuts.includes(scene)) { return shortcuts.indexOf(scene)}
        return "x"
    }

    const sceneSet = props.noShortcuts ? nonShortcuts : scenes

    if (!sceneSet || sceneSet.length<1 ) { return null }

    return (
        <Group spacing="xs" direction="column" noWrap grow style={{ width: "100%"}}>
            <Text>Scenes</Text>
            { sceneSet.map(scene =>
                <SceneItem  key={scene} endpointId={scene} shortcut={shortcutId(scene)} small={true}
                                computedLevel={currentScene} highlight={true} />
            )}
        </Group>
    );

}

export default AreaScenes
