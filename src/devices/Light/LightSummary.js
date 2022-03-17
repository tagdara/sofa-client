import React, { useEffect } from 'react';
import { BsLightbulb as Lightbulb, BsLightbulbOff as LightbulbOff } from "react-icons/bs";
import PlaceholderCard from 'layout/PlaceholderCard';
import LightChristmasButton from 'devices/Light/LightChristmasButton';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { compareState, endpointIdsByDisplayCategory } from 'store/deviceHelpers'
import { Group, Text, useMantineTheme } from '@mantine/core'
import { selectPage } from 'helpers/layoutHelpers';
import WideAvatar from 'components/WideAvatar'
import AreasLightsOn from 'devices/Area/AreasLightsOn'

const LightSummary = props => {
    const theme = useMantineTheme()
    const xmas = false
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

    const iconColor = lightCount('on') > 0 ?  theme.colors[theme.primaryColor] : undefined

    return (
        <Group position="apart" noWrap >
            <Group noWrap style={{ alignItems: "flex-start"}}>
                <WideAvatar color={iconColor} size="lg"
                            onClick={ () => selectPage('LightPage') }
                            left={ lightCount('on') ? <Lightbulb size="20" /> : <LightbulbOff size="20" /> }
                            right={ lightCount('on') ? lightCount('on') : undefined }
                    /> 
                <Group direction="column" spacing={"xs"} style={{ width: "100%"}} >
                    <Text   size={ lightCount('on') ? "sm" : "lg" }
                            weight={500} 
                            style={{width: "100%"}} 
                            lineClamp={1}
                    >
                        { lightCount('on') ? "Lights are on in these areas" : "All lights off" }
                        
                    </Text>
                    <AreasLightsOn />
                </Group>
            </Group>
            { checkHoliday() }
        </Group>
    );
}

export default LightSummary;
