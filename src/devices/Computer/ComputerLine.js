import React from 'react';
import { CloudOff, HardDrive } from 'react-feather'
import { ActionIcon, Group } from '@mantine/core';
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import VolumeSegment from 'device-model/property/volume/VolumeSegment'
import MutedSegment from 'device-model/property/muted/MutedSegment'
import LockStateSegment from 'device-model/property/lockState/LockStateSegment'

const ComputerLine = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)

    const on = reachable && powerStateBool

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >  
                <ActionIcon size="md" color={ on ? "primary" : undefined }>
                    { reachable ? <HardDrive size={20} /> : <CloudOff size={16} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { reachable ? null : 'Not reachable' }
                            on={on}
            />
            <SplitButton>
                { on &&
                    <>
                        <LockStateSegment icon endpointId={props.endpointId} />
                        <Group noWrap spacing={0}>
                            <MutedSegment position="start" icon endpointId={props.endpointId} />
                            <VolumeSegment position="end" endpointId={props.endpointId} />
                        </Group>
                    </>
                }
                <PowerStateSwitch endpointId={props.endpointId} />
            </SplitButton>
        </SplitButtonGroup>
    )
}

export default ComputerLine;
