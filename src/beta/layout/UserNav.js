import React, { useState } from 'react';
import NavButton from 'beta/layout/NavButton';
import { Card } from '@mantine/core';
import { User, LogOut, RotateCcw } from 'react-feather';
import useLoginStore from 'store/loginStore';

const UserNav = props => {

    const [ expand, setExpand] = useState(false)
    const name = useLoginStore( state => state.name )
    const logout = useLoginStore( state => state.logout )

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    } 

    if (expand) {
        return (
            <Card sx={{ padding: 0}}>
                <NavButton avatar={<User size={20} />} label={name} arrowLeft onClick={ () => setExpand(false) } />
                <NavButton color="orange" avatar={<RotateCcw size={20} />} label={"Reload"} secondary={"v." + process.env.REACT_APP_VERSION} arrowLeft onClick={ () => reloadPWA() } />
                <NavButton color="red" avatar={<LogOut size={20} />} label={"Logout"} arrowLeft onClick={ () => logout() } />
            </Card>
        )
    }

    return (
        <Card sx={{ padding: 0}}>
            <NavButton avatar={<User size={20} />} label={name} arrow onClick={ () => setExpand(true) }  />
        </Card>
    )
}

export default UserNav