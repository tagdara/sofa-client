import React from 'react';
import { Group, Select, Text} from '@mantine/core'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import useChildren from 'endpoint-model/property/children/useChildren'
import useScene from 'endpoint-model/property/scene/useScene'


const AreaSceneSelect = props => {

    const { scenes } = useChildren(props.endpointId)
    const { scene: currentScene } = useScene(props.endpointId)
    const selections = scenes.map(scene => ({value: scene, label: friendlyNameByEndpointId(scene)})) 

    if (!selections || selections.length<1 ) { return null }


    function runScene( sceneEndpointId) {
        //setWorking(true)
        directive(sceneEndpointId, 'Alexa.SceneController', 'Activate')
    }

    return (
        <Group position={"apart"} noWrap grow style={{ width: "100%"}}>
            { props.label && <Text style={{ flexGrow: 0, flexBasis: "auto"}}>{props.label}</Text> } 
            <Select size={ props.size ? props.size : "sm" } 
                    placeholder={ "Select scene" }
                    onChange={ runScene } 
                    value={ currentScene }
                    data={ selections }
                    style={{  minWidth: 100, maxWidth: props.half ? "50%" : "100%" }}
            />
        </Group>
    );

}

export default AreaSceneSelect
