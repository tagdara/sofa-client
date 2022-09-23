import React from 'react';
import { Group, Stack, Text, useMantineTheme } from '@mantine/core'

import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import { selectPage } from 'helpers/layoutHelpers';
import PlaceholderCard from 'layout/PlaceholderCard';
import WideAvatar from 'layout/components/WideAvatar'
import AreasLightsOn from 'devices/Area/AreasLightsOn'
import LightChristmasButton from 'devices/Light/LightChristmasButton';
import { IconBulb, IconBulbOff } from '@tabler/icons'
import { useMultiRegister } from 'endpoint-model/register'

const LightSummary = () => {
    const theme = useMantineTheme()
    const xmas = false
    const lights = endpointIdsByDisplayCategory('LIGHT')
    const states = useMultiRegister(lights)
    const treeEndpointId = 'insteon:node:1A F1 A5 1'

    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }
    
    function lightCount(condition) {
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

    const lightsOn = lightCount('on') > 0

    function isReachable(dev) {
        return dev?.["Alexa.EndpointHealth"]?.connectivity?.value?.value === 'OK'
    }

    function checkHoliday() {
        if (xmas) {
            return <LightChristmasButton endpointId={treeEndpointId} />
        }
        return null
    }

    const iconColor = lightsOn ? theme.colors[theme.primaryColor] : undefined

    return (
        <Group position="apart" noWrap >
            <Group noWrap style={{ alignItems: lightsOn ? "flex-start" : "center "}}>
                <WideAvatar color={iconColor} size="lg"
                            onClick={ () => selectPage('LightPage') }
                            left={ lightCount('on') ? <IconBulb size="24" /> : <IconBulbOff size="24" />}
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
                    { lightsOn && <AreasLightsOn /> }
                </Stack>
            </Group>
            { checkHoliday() }
        </Group>
    );
}

export default LightSummary;
