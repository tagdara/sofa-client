import React, { useEffect } from 'react';
import { Group, Stack, Text, useMantineTheme } from '@mantine/core'

import useDeviceStateStore from 'store/deviceStateStore'
import { compareState, endpointIdsByDisplayCategory, register, unregister } from 'store/deviceHelpers'
import { selectPage } from 'helpers/layoutHelpers';
import PlaceholderCard from 'layout/PlaceholderCard';
import WideAvatar from 'components/WideAvatar'
import AreasLightsOn from 'devices/Area/AreasLightsOn'
import LightChristmasButton from 'devices/Light/LightChristmasButton';
import { IconBulb, IconBulbOff } from '@tabler/icons'

const LightSummary = () => {
    const theme = useMantineTheme()
    const xmas = false
    const lights = endpointIdsByDisplayCategory('LIGHT')
    const states = useDeviceStateStore(state => Object.fromEntries(lights.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))
    const treeEndpointId = 'insteon:node:1A F1 A5 1'

    useEffect(() => {
        register(lights, "LightSummary")
        return function cleanup() {
            unregister(lights, "LightSummary")
        };
    // eslint-disable-next-line 
    }, [])


    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }
    
    function lightCount(condition) {
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

    const lightsOn = lightCount('on') > 0

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

    const iconColor = lightsOn ? theme.colors[theme.primaryColor] : undefined

    if (!lightCount('on')) {
        return (
            <Group style={{ display: "flex", alignItems: "center"}} onClick={ () => selectPage('LightPage') }>
                <IconBulbOff size={24} />
                <Text   
                    size={ "lg" }
                    weight={500} 
                    lineClamp={1}
                    style={{ paddingTop: 4}}
                >
                    { "All lights are off" }  
                </Text>
            </Group>
        )
    }

    return (
        <Group position="apart" noWrap >
            <Group noWrap style={{ alignItems: lightsOn ? "flex-start" : "center "}}>
                <WideAvatar color={iconColor} size="lg"
                            onClick={ () => selectPage('LightPage') }
                            left={ <IconBulb size="24" /> }
                            right={ lightCount('on') ? lightCount('on') : undefined }
                    /> 
                <Stack spacing={"xs"}>
                    <Text   size={ lightCount('on') ? "sm" : "lg" }
                            weight={500} 
                            style={{width: "100%"}} 
                            lineClamp={1}
                    >
                        { lightCount('on') ? "Lights are on in these areas" : "All lights off" }
                        
                    </Text>
                    <AreasLightsOn />
                </Stack>
            </Group>
            { checkHoliday() }
        </Group>
    );
}

export default LightSummary;
