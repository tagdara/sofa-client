import React from 'react';
// import ChristmasTreeIcon from 'resources/ChristmasTreeIcon';
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import { ActionIcon } from '@mantine/core'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useConnectivity from 'endpoint-model/property/connectivity/useConnectivity'
import { IconChristmasTree, IconChristmasTreeOff } from '@tabler/icons';

const LightChristmasButton = props => {
    
    const treeEndpointId = endpointIdByFriendlyName('Christmas Tree')
    const { powerStateBool: treeOn, toggle } = usePowerState(treeEndpointId)
    const { connectivityBool } = useConnectivity(treeEndpointId)

    if (!connectivityBool) { return null }

    return (
        <ActionIcon size="lg" color={ treeOn ? "green" : "gray" } variant={ treeOn ? "light" : "light" } onClick={toggle } >
            { treeOn ?
                <IconChristmasTree style={{color: 'lime' }} />
                :
                <IconChristmasTreeOff style={{color: 'green' }} />
            }
        </ActionIcon >
    )

}

export default LightChristmasButton;
