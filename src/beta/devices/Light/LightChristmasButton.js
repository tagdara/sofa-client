import React, { useEffect } from 'react';
import ChristmasTreeIcon from 'resources/ChristmasTreeIcon';
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

const LightChristmasButton = props => {

    const tree = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const treeOn = tree && tree.PowerController.powerState.value === 'ON'

    useEffect(() => {
        register(props.endpointId, "xmasLight"+treeEndpointId)
        return function cleanup() {
            unregister(props.endpointId, "xmasLight"+treeEndpointId);
        };
    // eslint-disable-next-line 
    }, [])  

    function toggleTree(event) {
        event.stopPropagation()
        directive(props.endpointId, 'PowerController', treeOn ? 'TurnOff' : 'TurnOn')
    }
    

    return (
        <ActionButton style={{ backgroundColor: treeOn ? "rgba(255,255,0,0.1)" : undefined }} onClick={(event)=>toggleTree(event) } >
            <ChristmasTreeIcon treeOn={ treeOn } />
        </ActionButton>
    )

}

export default LightChristmasButton;
