import React, { useEffect } from 'react';
import ChristmasTreeIcon from 'resources/ChristmasTreeIcon';
import useEndpointStateStore from 'endpoint-model/store/endpointStateStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'
import { ActionIcon } from '@mantine/core'

const LightChristmasButton = props => {

    const tree = useEndpointStateStore(state => state.deviceStates[props.endpointId] )
    const treeOn = tree && tree.PowerController.powerState.value === 'ON'

    useEffect(() => {
        register(props.endpointId, "xmasLight"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "xmasLight"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])  

    function toggleTree(event) {
        event.stopPropagation()
        directive(props.endpointId, 'PowerController', treeOn ? 'TurnOff' : 'TurnOn')
    }
    

    return (
        <ActionIcon size="lg" style={{ backgroundColor: treeOn ? "rgba(255,255,0,0.1)" : undefined }} onClick={(event)=>toggleTree(event) } >
            <ChristmasTreeIcon treeOn={ treeOn } />
        </ActionIcon >
    )

}

export default LightChristmasButton;
