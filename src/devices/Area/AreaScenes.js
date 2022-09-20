import React from 'react';
import SceneItem from 'endpoint-model/controller/SceneController/SceneItem';
import { Divider, Stack } from '@mantine/core'

const AreaScenes = props => {

    const nonShortcuts = props.scenes ? props.scenes.filter(endpointId => !props.shortcuts.includes(endpointId)) : []

    function shortcutId(scene) {
        if (props.shortcuts.includes(scene)) { return props.shortcuts.indexOf(scene)}
        return "x"
    }

    const sceneSet = props.noShortcuts ? nonShortcuts : props.scenes

    if (!sceneSet || sceneSet.length<1 ) { return null }

    return (
        <Stack spacing="xs" style={{ width: "100%"}}>
            <Divider variant="dashed" label="Scenes" />
            { sceneSet.map(scene =>
                <SceneItem  key={scene} endpointId={scene} shortcut={shortcutId(scene)} small={true}
                                computedLevel={props.current} highlight={true} onCard />
            )}
        </Stack>
    );

}

export default AreaScenes
