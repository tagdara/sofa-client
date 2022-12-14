import React from "react";
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import AreaShortcutSlider from 'devices/Area/AreaShortcutSlider'
import { ActionIcon, Group } from '@mantine/core'
import { directive } from 'endpoint-model/directive/directive'
import useSceneCurrent from 'endpoint-model/property/mode/SceneCurrent/useSceneCurrent'
import { IconMovie, IconBulb } from '@tabler/icons';

const TelevisionLightControls = props => {

    const area = endpointIdByFriendlyName('Living Room')
    const { sceneEndpointId } = useSceneCurrent(area)

    function runScene( sceneEndpointId) {
        directive(sceneEndpointId, 'Alexa.SceneController', 'Activate')
    }
    
    const currentWatch = sceneEndpointId === "scene:Watch"

    return (
        <Group noWrap>
            <ActionIcon>
                <IconBulb size={20} />
            </ActionIcon>
            <AreaShortcutSlider endpointId={area} />
            <ActionIcon color={currentWatch ? "red" : undefined } variant="light" onClick={ () => runScene("scene:Watch")}>
                <IconMovie size={20} />
            </ActionIcon>
        </Group>
    );
}

export default TelevisionLightControls;