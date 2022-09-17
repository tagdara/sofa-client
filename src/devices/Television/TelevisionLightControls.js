import React from "react";
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import StackCard from 'components/StackCard'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import AreaShortcutSlider from 'devices/Area/AreaShortcutSlider'
import { ActionIcon, Group, Text } from '@mantine/core'
import { directive } from 'store/directive'
import { Tv } from 'react-bootstrap-icons'
import useScene from 'endpoint-model/property/scene/useScene'

const TelevisionLightControls = props => {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const area = endpointIdByFriendlyName('Living Room')
    const currentHour = new Date().getHours();
    const night = currentHour >= 17 || currentHour <= 6
    const { scene: currentScene } = useScene(area)

    if (!on || !night ) { return null}

    function runScene( sceneEndpointId) {
        //setWorking(true)
        directive(sceneEndpointId, 'SceneController', 'Activate')
    }
    
    const currentWatch = currentScene === "logic:scene:Watch"

    return (
        <StackCard>
            <Group noWrap>
                <Text>Lights</Text>
                <AreaShortcutSlider endpointId={area} />
                <ActionIcon color={currentWatch ? "red" : undefined } variant="light" onClick={ () => runScene("logic:scene:Watch")}>
                    <Tv size={20} />
                </ActionIcon>
            </Group>
        </StackCard>
    );
}

export default TelevisionLightControls;