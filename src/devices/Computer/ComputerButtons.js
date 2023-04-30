import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerButton from 'devices/Computer/ComputerButton';
import { SimpleGrid } from '@mantine/core';
import { outletMap } from 'devices/Computer/computerSettings'

const ComputerButtons = props => {

    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const dualBoot = { "pc1": "tdayton-z03" }

    const dualBootMode = (endpointId) => {
        if (Object.keys(dualBoot).includes(endpointId)) return "primary"
        if (Object.values(dualBoot).includes(endpointId)) return "secondary"
        return false
    }

    return (
        <SimpleGrid cols={4} spacing={"sm"} style={{ width: "100%"}}>
            { computers.map(endpointId => 
                <ComputerButton key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} dualBootMode={ dualBootMode(endpointId)} />
            )}
        </SimpleGrid>
    );
}

export default ComputerButtons;