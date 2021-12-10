import React, { useEffect } from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import PlaceholderCard from 'layout/PlaceholderCard';
import LightChristmasButton from 'devices/Light/LightChristmasButton';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { compareState, endpointIdsByDisplayCategory } from 'store/deviceHelpers'
import { Avatar, Group, Text } from '@mantine/core'

const LightSummary = props => {
    const xmas = true
    const lights = endpointIdsByDisplayCategory('LIGHT')
    const states = useDeviceStateStore(state => Object.fromEntries(lights.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)
    const treeEndpointId = 'insteon:node:1A F1 A5 1'

    useEffect(() => {
        register(lights, "LightSummary")
        return function cleanup() {
            unregister(lights, "LightSummary")
        };
    // eslint-disable-next-line 
    }, [])


    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }
    
    function lightCount(condition, source) {
        var count = 0;
        for (var dev in states) {
            var light = states[dev]
            if (light) {
                switch (condition.toUpperCase()) {
                    case "OFF":
                        if (light.PowerController.powerState.value === "OFF" || !isReachable(light)) {
                            count=count+1
                        }
                        break;
                    case "ON":
                        if (light.PowerController.powerState.value === "ON" && isReachable(light)) {
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

    function isReachable(dev) {
        try {
            if (dev.EndpointHealth.connectivity.value.value==='OK') {
                return true
            }
        }
        catch {}
        return false
    }

    function checkHoliday() {
        if (xmas) {
            return <LightChristmasButton endpointId={treeEndpointId} />
        }
        return null
    }

    const iconColor = lightCount('on') > 0 ?  'green' : undefined
    const labelText = lightCount('on') === 1 ? lightCount('on')+" light is on" : lightCount('on')+" lights are on"

    return (
        <Group position="apart" noWrap>
            <Group noWrap>
                <Avatar color={iconColor}>
                    {<Lightbulb size={20} />}
                </Avatar>     
                <Text style={{width: "100%"}} lineClamp={1}>{ lightCount('on') ? labelText : "All lights off" }</Text>
            </Group>
            { checkHoliday() }
        </Group>
    );
}

export default LightSummary;
