import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerBadge from 'devices/Computer/ComputerBadge';
import { Group } from '@mantine/core'

const ComputerOnList = props => {
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}

    return (
        <Group spacing="xs">
            { computers.map(endpointId => 
                <ComputerBadge key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </Group>
    );
}

export default ComputerOnList;