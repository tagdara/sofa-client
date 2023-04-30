import React from "react";
import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerButtons from 'devices/Computer/ComputerButtons';
import { Avatar, Divider, Group } from '@mantine/core';
import { IconCloudOff, IconDeviceDesktop, IconDeviceDesktopOff } from '@tabler/icons';
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import useMultiEndpointHealth from 'endpoint-model/multidevice/useMultiEndpointHealth'
import MatrixPullUp from 'devices/Matrix/MatrixPullUp'
import usePullUp from 'layout/pullup/usePullUp'
import { matrixManualSort } from 'devices/Matrix/matrixSettings'

const MatrixSummary = props => {

    const { pullUpActive, showPullUp } = usePullUp('matrix')
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const { onlineCount } = useMultiEndpointHealth(matrixManualSort)
    const offlineCount = matrixManualSort.length - onlineCount
    const { onCount } = useMultiPower(computers)
    const onIcon = onCount ? <IconDeviceDesktop size={24}  /> : <IconDeviceDesktopOff size={24} /> 
    const matrixIcon = offlineCount ? <IconCloudOff size={24}  /> : onIcon
    const onColor = onCount ? "primary" : undefined 
    const matrixColor = offlineCount ? "red" : onColor


    return (
        <Group spacing="xl" noWrap style={{ width: "100%" }}>
            <Avatar
                color = { matrixColor }
                size={"lg"} 
                onClick={ showPullUp }
                radius="md"
            >
                {matrixIcon}
            </Avatar>
            <Divider orientation="vertical" />
            <ComputerButtons />
            <MatrixPullUp opened={pullUpActive}/>
        </Group>
    );


}

export default MatrixSummary;