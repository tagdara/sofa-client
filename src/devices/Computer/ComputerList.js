import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import ComputerLine from 'devices/Computer/ComputerLine';
import { Group } from '@mantine/core'

const ComputerList = props => {
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}

    return (
        <Group direction="column" style={{ width: "100%"}}>
            { computers.map(endpointId => 
                <ComputerLine key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </Group>
    );
}

export default ComputerList;