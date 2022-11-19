import React from 'react';
import { ActionIcon } from '@mantine/core';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'

export default function Endpoint(props) {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (
        <SplitButtonGroup >
            <SplitButton >        
                <ActionIcon size="md"  >
                    <EndpointIcon endpointId={props.endpointId} size={16} />
                </ActionIcon>
            </SplitButton>
            <SplitButton label = { name } secondary={props.endpointId} />
        </SplitButtonGroup>
    )

}

