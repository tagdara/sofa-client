import React from 'react';
import { NavLink } from '@mantine/core';
import { IconUser, IconReload, IconLogout } from '@tabler/icons';
import useLoginStore from 'store/loginStore';
import { reloadPWA } from 'store/reloadPWA'

const UserNav = () => {

    const name = useLoginStore( state => state.name )
    const logout = useLoginStore( state => state.logout )

    const capitalName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <NavLink 
            childrenOffset={16}
            label={capitalName}
            description={"User Settings"}
            icon={<IconUser size={20} />}
        >
            <NavLink icon={<IconReload size={16} />} label={"Reload"} description={"v" + process.env.REACT_APP_VERSION} onClick={ () => reloadPWA() } />
            <NavLink icon={<IconLogout size={16} />} label={"Logout"} onClick={ () => logout() } /> 
        </NavLink>
    )
}

export default UserNav