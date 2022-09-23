import React from 'react';
import ChristmasTreeIcon from 'resources/ChristmasTreeIcon';
import { directive } from 'endpoint-model/directive/directive'
import { useRegister } from 'endpoint-model/register'
import { ActionIcon } from '@mantine/core'

const LightChristmasButton = props => {

    const tree = useRegister(props.endpointId)
    const treeOn = tree && tree.PowerController.powerState.value === 'ON'

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
