import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerCube from 'devices/Computer/ComputerCube';
import { Group } from '@mantine/core';
import CardLine from 'layout/components/CardLine'
import { PcDisplayHorizontal as Pc } from "react-bootstrap-icons";

const ComputerCollection = props => {
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}

    return (
        <>
        <CardLine   arrow icon={ <Pc /> }
                            primary={ "Computers"}
                            onClick={ props.onClick}
        />
        <Group spacing={"xs"} noWrap grow style={{ paddingTop: 12 }}>
            { computers.map(endpointId => 
                <ComputerCube key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </Group>
        </>
    );
}

export default ComputerCollection;