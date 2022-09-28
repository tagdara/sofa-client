import React from 'react';
import { Group, Stack, Text } from '@mantine/core'
import PowerStateAvatar from 'endpoint-model/property/powerState/PowerStateAvatar'
import { IconMusicOff } from '@tabler/icons';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const JukeboxOff = props => {

    const name = friendlyNameByEndpointId(props.endpointId) 

    return (
        <Group spacing="xl" onClick={props.onClick}>
            <PowerStateAvatar 
                endpointId={ props.endpointId } 
                icon={ <IconMusicOff /> }
            />
            <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                <Text 
                    size={props.size ? props.size : "lg"} 
                    lineClamp={1} 
                    style={{ flexGrow: 1 }}
                >
                    {name}
                </Text>
            </Stack>
        </Group>
    );
}

export default JukeboxOff;

