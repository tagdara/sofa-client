import React from 'react';
import { CloudOff, HardDrive } from 'react-feather'
import { ActionIcon, Group } from '@mantine/core';
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import useLockState from 'device-model/property/lockState/useLockState'
import useMode from 'device-model/property/mode/useMode'
import WakeSleepSegment from 'device-model/controller/WakeOnLanController/WakeSleepSegment'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import VolumeSegment from 'device-model/property/volume/VolumeSegment'
import EnergyLevelModeSegment from 'device-model/instance/EnergyLevelModeSegment'
import MutedSegment from 'device-model/property/muted/MutedSegment'
import LockStateSegment from 'device-model/property/lockState/LockStateSegment'

const ComputerLine = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { lockStateBool } = useLockState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy Level", props.value, props.directive)

    const outletOffStates = ["Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn

    function openMouse() {
        var newurl="https://mouse.dayton.tech?pc="+name+".dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >  
                <ActionIcon size="md" color={ on ? "primary" : undefined } onClick={ () => openMouse()}>
                    { reachable ? <HardDrive size={20} /> : <CloudOff size={16} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { reachable ? null : 'Offline' }
                            on={on}
            />
            <SplitButton>
                { on &&
                    <>
                    { lockStateBool ?
                        <LockStateSegment icon endpointId={props.endpointId} />
                    :
                        <Group noWrap spacing={0}>
                            <MutedSegment position="start" icon endpointId={props.endpointId} />
                            <VolumeSegment position="end" endpointId={props.endpointId} />
                        </Group>
                    }
                    </>
                }
                { modeLabel !== "Off" && <WakeSleepSegment icon={on} endpointId={props.endpointId} value={on ? "ON" : "OFF"} /> }
                <EnergyLevelModeSegment endpointId={props.outlet} instance={"Energy Level"} />
            </SplitButton>
        </SplitButtonGroup>
    )
}

export default ComputerLine;
