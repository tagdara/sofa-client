import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerCube from 'devices/Computer/ComputerCube';
import ComputerOnList from 'devices/Computer/ComputerOnList';
import { Avatar, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconDevicesPc, IconDevicesPcOff } from '@tabler/icons';
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import MatrixPullUp from 'devices/Matrix/MatrixPullUp'
import usePullUp from 'layout/pullup/usePullUp'

const ComputerCubes = props => {

    const { pullUpActive, showPullUp } = usePullUp('ComputerHero', 'matrix')
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const { onCount } = useMultiPower(computers)
    const outletMap = {"pc1": "PC1 outlet", "pc2": "PC2 outlet", "pc3" :"PC3 outlet", "pc4": "PC4 outlet"}
    const on = true

    return (
        <SimpleGrid cols={4} spacing={"sm"}>
            { computers.map(endpointId => 
                <ComputerCube key={endpointId} endpointId={ endpointId } outlet={endpointIdByFriendlyName(outletMap[endpointId])} />
            )}
        </SimpleGrid>
    );
}

export default ComputerCubes;