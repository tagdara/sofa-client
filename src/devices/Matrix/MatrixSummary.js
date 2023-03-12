import React from "react";
import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerOnList from 'devices/Computer/ComputerOnList';
import { Avatar, Group, Stack, Text } from '@mantine/core';
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
        <>
            <Stack spacing="md">
                <Group spacing="xl" onClick={ showPullUp }>
                    <Avatar
                        color = { matrixColor }
                        size={"lg"} 
                    >
                        {matrixIcon}
                    </Avatar>
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            Matrix Screens
                        </Text>
                        <ComputerOnList  />
                    </Stack>
                </Group>
            </Stack>
            <MatrixPullUp opened={pullUpActive}/>
        </>
    );
}

export default MatrixSummary;