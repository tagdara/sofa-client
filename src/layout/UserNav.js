import React from 'react';
import { Avatar, NavLink, Group, ActionIcon} from '@mantine/core';
import { IconReload, IconLogout } from '@tabler/icons';
import useLoginStore from 'login/loginStore';
import { reloadPWA } from 'network/reloadPWA'

const UserNav = () => {

    const name = useLoginStore( state => state.name )
    const logout = useLoginStore( state => state.logout )

    const capitalName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <NavLink 
            label={capitalName} 
            icon={<Avatar radius="xl">{capitalName.charAt(0)}</Avatar>}
            rightSection={
                <Group>
                    <ActionIcon>
                        <IconReload size={20} onClick={reloadPWA} />
                    </ActionIcon>
                    <ActionIcon>
                        <IconLogout size={20} onClick={logout} />
                    </ActionIcon>
                </Group>
            }
        /> 
    )
}

export default UserNav