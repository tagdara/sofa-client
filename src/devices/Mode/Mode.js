import React from 'react';
import { ActionIcon } from '@mantine/core';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import { IconTag } from '@tabler/icons';

export default function Mode(props) {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >        
                <ActionIcon size="md" color={ on ? "primary" : undefined } >
                    <IconTag size={16} />
                </ActionIcon>
            </SplitButton>
            <SplitButton label = { name } on={on} />
            <SplitButton>
                <PowerStateSwitch endpointId={props.endpointId} />
            </SplitButton>
        </SplitButtonGroup>
    )

}

