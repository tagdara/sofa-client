import React from 'react';
import { Badge } from '@mantine/core'
import { compareState,friendlyNameByEndpointId, isReachable } from 'store/deviceHelpers'
import useChildren from 'device-model/property/children/useChildren'
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'

const AreaLightsOnBadge = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { lights } = useChildren(props.endpointId)
    const states = useDeviceStateStore(state => Object.fromEntries(lights.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    if (!lights || lights.length<1 ) { return null }

    function turnOffLights() {
        lights.map( lightEndpointId => {
            return directive(lightEndpointId, "PowerController", "TurnOff")
        })
    }

    function lightCount(condition, source) {
        var count = 0;
        for (var dev in states) {
            var light = states[dev]
            if (light) {
                const powerState = light && light.PowerController ? light.PowerController.powerState.value : "OFF"
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
        <Badge onClick={turnOffLights} size="sm" variant="light">{name}</Badge>
    );

}

export default AreaLightsOnBadge

