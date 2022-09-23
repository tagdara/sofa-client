import React from 'react';
import CardLineSlider from 'layout/components/CardLineSlider';
import { directive } from 'endpoint-model/directive/directive'
import { endpointByEndpointId } from 'endpoint-model/discovery'
import useScene from 'endpoint-model/property/scene/useScene'
import useShortcuts from 'endpoint-model/property/shortcuts/useShortcuts'

const AreaShortcutSlider = props => {

    const { scene } = useScene(props.endpointId)
    const { shortcuts } = useShortcuts(props.endpointId)

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(shortcuts[level], 'Alexa.SceneController', 'Activate')
    }
    
    if (shortcuts.length === 0 ) { return null }

    const level = shortcuts.indexOf(scene);
    const levelLabels = shortcuts.map( (endpointId, index) => ( { value: index, label: endpointByEndpointId(endpointId).friendlyName  }))

    return (
        <CardLineSlider on={true} delay={500} value={level} labels={levelLabels} marks={levelLabels} hideLabels max={shortcuts.length-1} change={runShortcut} />
    )

}

export default AreaShortcutSlider