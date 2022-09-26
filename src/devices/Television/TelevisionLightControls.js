import React from "react";
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import AreaShortcutSlider from 'devices/Area/AreaShortcutSlider'
import { ActionIcon, Group } from '@mantine/core'
import { directive } from 'endpoint-model/directive/directive'
import useScene from 'endpoint-model/property/scene/useScene'
import { IconMovie, IconBulb } from '@tabler/icons';

const TelevisionLightControls = props => {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const area = endpointIdByFriendlyName('Living Room')
    const currentHour = new Date().getHours();
    const night = currentHour >= 17 || currentHour <= 6
    const { scene: currentScene } = useScene(area)

    if (!on || !night ) { return null}

    function runScene( sceneEndpointId) {
        //setWorking(true)
        directive(sceneEndpointId, 'Alexa.SceneController', 'Activate')
    }
    
    const currentWatch = currentScene === "logic:scene:Watch"

    return (
        <Group noWrap>
            <ActionIcon>
                <IconBulb size={20} />
            </ActionIcon>
            <AreaShortcutSlider endpointId={area} />
            <ActionIcon color={currentWatch ? "red" : undefined } variant="light" onClick={ () => runScene("logic:scene:Watch")}>
                <IconMovie size={20} />
            </ActionIcon>
        </Group>
    );
}

export default TelevisionLightControls;