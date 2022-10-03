import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerCube from 'devices/Computer/ComputerCube';
import { SimpleGrid } from '@mantine/core';

const ComputerCubes = props => {

    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}

    return (
        <SimpleGrid cols={4} spacing={"sm"}>
            { computers.map(endpointId => 
                <ComputerCube key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </SimpleGrid>
    );
}

export default ComputerCubes;