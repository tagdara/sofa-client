import React from "react";
import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerOnList from 'devices/Computer/ComputerOnList';
import { Avatar, Group, Stack, Text } from '@mantine/core';
import { IconDeviceDesktop, IconDeviceDesktopOff } from '@tabler/icons';
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import MatrixPullUp from 'devices/Matrix/MatrixPullUp'
import usePullUp from 'layout/pullup/usePullUp'

const MatrixSummary = props => {

    const { pullUpActive, showPullUp } = usePullUp('matrix')
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const { onCount } = useMultiPower(computers)

    return (
        <>
            <Stack spacing="md">
                <Group spacing="xl" onClick={ showPullUp }>
                    <Avatar
                        color = { onCount ? "primary" : undefined }
                        size={"lg"} 
                    >
                        { onCount ?
                            <IconDeviceDesktop size={24}  />  
                        :
                            <IconDeviceDesktopOff size={24} /> 
                        } 
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