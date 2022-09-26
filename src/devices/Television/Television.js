import React from 'react';
import {  Group, Stack, Text } from '@mantine/core'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateAvatar from 'endpoint-model/property/powerState/PowerStateAvatar'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import TelevisionDetailLine from 'devices/Television/TelevisionDetailLine'
import usePullUp from 'layout/pullup/usePullUp'
import TelevisionPullUp from 'devices/Television/TelevisionPullUp'

import { IconDeviceTv, IconDeviceTvOff } from '@tabler/icons';

const Television = props => {
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { pullUpActive, showPullUp } = usePullUp('TvHero', name)
    const { powerStateBool: on } = usePowerState(props.endpointId)

    return (
        <>
            <Stack spacing={8}>
                <Group spacing="xl" onClick={showPullUp}>
                    <PowerStateAvatar 
                        endpointId={ props.endpointId } 
                        icon={ on ?
                            <IconDeviceTv size={24}  />  
                            :
                            <IconDeviceTvOff size={24} /> 
                            } 
                        />
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            {name}
                        </Text>
                        { on && <TelevisionDetailLine endpointId={props.endpointId} matrix={props.matrix} />  }
                    </Stack>
                </Group>
            </Stack>
        
            { pullUpActive && <TelevisionPullUp matrix={props.matrix} endpointId={props.endpointId} /> }
        </>
    );
}


export default Television;
