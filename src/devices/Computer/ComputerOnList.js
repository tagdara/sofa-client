import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import ComputerBadge from 'devices/Computer/ComputerBadge';


const ComputerOnList = props => {
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}

    return (
        <>
            { computers.map(endpointId => 
                <ComputerBadge key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </>
    );
}

export default ComputerOnList;