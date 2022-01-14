import React from "react";
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers';
import ComputerLine from 'devices/Computer/ComputerLine';
import { Group } from '@mantine/core'

const ComputerList = props => {
    const computers = endpointIdsByDisplayCategory('COMPUTER')

    console.log('computers', computers)

    return (
        <Group direction="column" style={{ width: "100%"}}>
            { computers.map(endpointId => 
                <ComputerLine key={endpointId} endpointId={ endpointId } />
            )}
        </Group>
    );
}

export default ComputerList;