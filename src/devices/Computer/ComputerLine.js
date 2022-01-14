import React from 'react';
import { CloudOff, HardDrive } from 'react-feather'
import { ActionIcon } from '@mantine/core';
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import VolumeSegment from 'device-model/property/volume/VolumeSegment'
import MutedButton from 'device-model/property/muted/MutedButton'

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
                <MutedButton endpointId={props.endpointId} />
                <VolumeSegment endpointId={props.endpointId} />
                <PowerStateSwitch endpointId={props.endpointId} />
            </SplitButton>
        </SplitButtonGroup>
    )
}

export default ComputerLine;
