import React from 'react';
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useMode from 'endpoint-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import WakeSleepSegment from 'endpoint-model/controller/WakeOnLanController/WakeSleepSegment'
import EnergyLevelLine from 'endpoint-model/instance/EnergyLevelLine'
import {  Button, Divider, Group, Stack } from '@mantine/core'
import VolumeSliderLine from 'endpoint-model/property/volume/VolumeSliderLine'
import { IconMouse } from '@tabler/icons';
import PullUpCard from 'layout/pullup/PullUpCard'
import PowerStateLine from 'endpoint-model/property/powerState/PowerStateLine'

const ComputerPullUp = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy.Level", props.value, props.directive)

    const outletOffStates = ["Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn

    function openMouse() {
        var newurl="https://mouse.dayton.tech?pc="+name+".dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (  
        <PullUpCard title={name} name={name}>
            <Stack spacing={"xl"} width={"100%"}>
                <PowerStateLine icon label="Power Outlet" endpointId={props.outlet} />
                <EnergyLevelLine icon label endpointId={props.outlet} />
                <VolumeSliderLine label={"Volume"} endpointId={props.endpointId} icon={true} />
                <Divider style={{ padding: 4 }} />
                <Group grow position="apart" noWrap>
                    <Button onClick={openMouse} disabled={!outletOn} compact leftIcon={<IconMouse size={16} />} variant="light">Control</Button>
                    <WakeSleepSegment label icon endpointId={props.endpointId} value={{ "powerState" : "ON" }} />
                    <WakeSleepSegment label icon endpointId={props.endpointId} value={{ "powerState" : "OFF" }} />
                </Group>
            </Stack>
        </PullUpCard>
    )

}

export default ComputerPullUp;
