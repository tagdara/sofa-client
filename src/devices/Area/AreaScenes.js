import React from 'react';
import SceneItem from 'devices/Scene/SceneItem';
import { Divider, Group } from '@mantine/core'

const AreaScenes = props => {

    const nonShortcuts = props.scenes ? props.scenes.filter(endpointId => !props.shortcuts.includes(endpointId)) : []

    function shortcutId(scene) {
        if (props.shortcuts.includes(scene)) { return props.shortcuts.indexOf(scene)}
        return "x"
    }

    const sceneSet = props.noShortcuts ? nonShortcuts : props.scenes

    if (!sceneSet || sceneSet.length<1 ) { return null }

    return (
        <Group spacing="xs" direction="column" noWrap grow style={{ width: "100%"}}>
            <Divider variant="dashed" label="Scenes" />
            { sceneSet.map(scene =>
                <SceneItem  key={scene} endpointId={scene} shortcut={shortcutId(scene)} small={true}
                                computedLevel={props.currentScene} highlight={true} />
            )}
        </Group>
    );

}

export default AreaScenes
