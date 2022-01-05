import React from 'react';
import { ActionIcon } from '@mantine/core';
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { Tag } from 'react-feather'

export default function Mode(props) {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >        
                <ActionIcon size="md" color={ on ? "primary" : undefined } >
                    <Tag size={16} />
                </ActionIcon>
            </SplitButton>
            <SplitButton label = { name } on={on} />
            <SplitButton>
                <PowerStateSwitch props={props.endpointId} />
            </SplitButton>
        </SplitButtonGroup>
    )

}

