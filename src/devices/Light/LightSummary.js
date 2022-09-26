import React from 'react';
import { Group, Stack, Text, useMantineTheme } from '@mantine/core'

import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import { selectPage } from 'helpers/layoutHelpers';
import WideAvatar from 'layout/components/WideAvatar'
import AreasLightsOn from 'devices/Area/AreasLightsOn'
import LightChristmasButton from 'devices/Light/LightChristmasButton';
import { IconBulb, IconBulbOff } from '@tabler/icons'
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'

const LightSummary = () => {
    const theme = useMantineTheme()
    const xmas = false
    const lights = endpointIdsByDisplayCategory('LIGHT')
    const { onCount } = useMultiPower(lights)

    const treeEndpointId = 'insteon:node:1A F1 A5 1'

    const lightsOn = onCount > 0

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
                <WideAvatar 
                    color={iconColor} 
                    size="lg"
                    onClick={ () => selectPage('LightPage') }
                    left={ lightsOn ? <IconBulb size="24" /> : <IconBulbOff size="24" />}
                    right={ lightsOn ? onCount : undefined }
                /> 
                <Stack spacing={"xs"}>
                    <Text
                        size={ lightsOn ? "sm" : "lg" }
                        weight={500} 
                        style={{width: "100%"}} 
                        lineClamp={1}
                    >
                        { lightsOn ? "Lights are on in these areas" : "All lights off" }
                    </Text>
                    { lightsOn && <AreasLightsOn /> }
                </Stack>
            </Group>
            { checkHoliday() }
        </Group>
    );
}

export default LightSummary;
