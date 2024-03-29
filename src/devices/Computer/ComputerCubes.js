import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerCube from 'devices/Computer/ComputerCube';
import { SimpleGrid } from '@mantine/core';
import { outletMap } from 'devices/Computer/computerSettings'

const ComputerCubes = props => {

    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const dualBoot = { "pc1": "tdayton-z03" }

    const dualBootMode = (endpointId) => {
        if (endpointId in Object.keys(dualBoot)) return "primary"
        if (endpointId in Object.values(dualBoot)) return "secondary"
        return false
    }

    return (
        <SimpleGrid cols={4} spacing={"sm"}>
            { computers.map(endpointId => 
                <ComputerCube key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} dualBootMode={ dualBootMode(endpointId)} />
            )}
        </SimpleGrid>
    );
}

export default ComputerCubes;