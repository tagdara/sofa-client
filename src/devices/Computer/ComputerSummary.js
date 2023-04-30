import React from "react";
import { sortByName, endpointIdByFriendlyName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import ComputerCube from 'devices/Computer/ComputerCube';
import ComputerOnList from 'devices/Computer/ComputerOnList';
import { Avatar, Group, Stack, Text } from '@mantine/core';
import { IconDevicesPc, IconDevicesPcOff } from '@tabler/icons';
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import MatrixPullUp from 'devices/Matrix/MatrixPullUp'
import usePullUp from 'layout/pullup/usePullUp'
import { outletMap } from 'devices/Computer/computerSettings'

const ComputerSummary = props => {

    const { pullUpActive, showPullUp } = usePullUp('ComputerHero', 'matrix')
    const computers = sortByName(endpointIdsByDisplayCategory('COMPUTER'))
    const { onCount } = useMultiPower(computers)
    const on = true

    return (
        <>
            <Stack spacing="md">
                <Group spacing="xl" onClick={ showPullUp }>
                    <Avatar
                        color = { onCount ? "primary" : undefined }
                        size={"lg"} 
                    >
                        { onCount ?
                            <IconDevicesPc size={24}  />  
                        :
                            <IconDevicesPcOff size={24} /> 
                        } 
                    </Avatar>
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            Computers
                        </Text>
                        { on && <ComputerOnList  />  }
                    </Stack>
                </Group>
            </Stack>
            <MatrixPullUp opened={pullUpActive}/>
        </>
    );
}

export default ComputerSummary;