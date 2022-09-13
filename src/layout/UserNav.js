import React from 'react';
import { NavLink } from '@mantine/core';
import { User, LogOut, RotateCcw } from 'react-feather';
import useLoginStore from 'store/loginStore';
import { reloadPWA } from 'store/reloadPWA'

const UserNav = props => {

    const name = useLoginStore( state => state.name )
    const logout = useLoginStore( state => state.logout )

    const capitalName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <NavLink 
            childrenOffset={16}
            label={capitalName}
            description={"User Settings"}
            icon={<User size={20} />}
        >
            <NavLink icon={<RotateCcw size={16} />} label={"Reload"} description={"v" + process.env.REACT_APP_VERSION} onClick={ () => reloadPWA() } />
            <NavLink icon={<LogOut size={16} />} label={"Logout"} onClick={ () => logout() } /> 
        </NavLink>
    )
}

export default UserNav