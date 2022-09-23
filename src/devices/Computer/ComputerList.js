import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerLine from 'devices/Computer/ComputerLine';


const ComputerList = props => {
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}

    return (
        <>
            { computers.map(endpointId => 
                <ComputerLine key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </>
    );
}

export default ComputerList;