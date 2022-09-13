import React, { useState } from 'react';
import { Text } from '@mantine/core';
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import useMode from 'device-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import WakeSleepSegment from 'device-model/controller/WakeOnLanController/WakeSleepSegment'
import EnergyLevelModeIcon from 'device-model/instance/EnergyLevelModeIcon'
import EnergyLevelLine from 'device-model/instance/EnergyLevelLine'
import { ActionIcon, Button, Card, Group, Portal, Stack } from '@mantine/core'
import VolumeSlider from 'device-model/property/volume/VolumeSlider'
import { IconMouse, IconPinned, IconMoon } from '@tabler/icons';
import usePageFrame from 'helpers/usePageFrame'

const ComputerCube = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy Level", props.value, props.directive)
    const [showPopover, setShowPopover] = useState(props.showAll)
    const container = document.getElementById('bottomrender')
    const { stackWidth } = usePageFrame()

    const outletOffStates = ["Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn

    function openMouse() {
        var newurl="https://mouse.dayton.tech?pc="+name+".dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (  
        <>   
        <Button size="md" fullWidth compact variant={ on ? "light" : "default"}
            onClick={ () => setShowPopover(!showPopover) }
            leftIcon={ on ? <EnergyLevelModeIcon size={16} endpointId={props.outlet} /> : <IconMoon size={12} />}
        >
            {name}
        </Button>        

        { showPopover &&
            <Portal target={container}>
                <Card withBorder style={{ width: stackWidth }}>
                    <Card.Section withBorder inheritPadding py="xs">
                        <Group position="apart">
                            <Text weight={500}>{name}</Text>
                            <ActionIcon onClick={() => setShowPopover(false)}><IconPinned size={16} /></ActionIcon>
                        </Group>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="xs">
                        <Stack spacing={"xl"} width={"100%"}>
                            <EnergyLevelLine icon label switch endpointId={props.outlet} />
                            <VolumeSlider label={"Volume"} endpointId={props.endpointId} icon={true} />
                            <Group grow position="apart" noWrap>
                                <Button onClick={openMouse} disabled={!on} compact leftIcon={<IconMouse size={16} />} variant="light">Control</Button>
                                <WakeSleepSegment label icon endpointId={props.endpointId} value={on ? "ON" : "OFF"} />
                            </Group>
                        </Stack>
                    </Card.Section>
                </Card>
            </Portal>
        }
        </>
    )

}

export default ComputerCube;
