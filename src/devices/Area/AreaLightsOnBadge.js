import React from 'react';
import { ActionIcon, Badge } from '@mantine/core'
import { compareState,friendlyNameByEndpointId, isReachable } from 'store/deviceHelpers'
import useChildren from 'endpoint-model/property/children/useChildren'
import useEndpointStateStore from 'endpoint-model/store/endpointStateStore'
import { directive } from 'store/directive'
import { X } from "react-bootstrap-icons";

const AreaLightsOnBadge = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { lights } = useChildren(props.endpointId)
    const states = useEndpointStateStore(state => Object.fromEntries(lights.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    if (!lights || lights.length<1 ) { return null }

    function turnOffLights() {
        lights.map( lightEndpointId => {
            return directive(lightEndpointId, "Alexa.PowerController", "TurnOff")
        })
    }

    function lightCount(condition, source) {
        var count = 0;
        for (var dev in states) {
            var light = states[dev]
            if (light) {
                const powerState = light?.["Alexa.PowerController"]?.powerState?.value || "OFF"
                switch (condition.toUpperCase()) {
                    case "OFF":
                        if (powerState === "OFF" || !isReachable(light)) {
                            count=count+1
                        }
                        break;
                    case "ON":
                        if (powerState === "ON" && isReachable(light)) {
                            count=count+1
                        } 
                        break;                   
                    default:
                        count = count + 1
                        break;
                }
            }
        }
        return count
    }

    if (lightCount('on') < 1 ) { return null }

    return (
        <Badge 
            sx={{ paddingRight: 3 }}
            onClick={turnOffLights} 
            size="sm" 
            variant="light" 
            rightSection={  <ActionIcon size="xs" radius="xl" variant="transparent">
                                <X size={12} />
                            </ActionIcon>
            }
        >
            {name}
        </Badge>
    );

}

export default AreaLightsOnBadge

