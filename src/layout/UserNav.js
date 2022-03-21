import React, { useState } from 'react';
import NavButton from 'layout/NavButton';
import { Card, Group } from '@mantine/core';
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
            <Card sx={{ width: "100%", padding: 0}}>
                <Group direction="column" spacing={2} >
                    <NavButton icon={<User size={20} />} label={name} leftArrow={expand} arrow={!expand} onClick={ () => setExpand(false) } />
                    <NavButton color="orange" icon={<RotateCcw size={20} />} label={"Reload"} detail={"v" + process.env.REACT_APP_VERSION} arrowLeft onClick={ () => reloadPWA() } />
                    <NavButton color="red" icon={<LogOut size={20} />} label={"Logout"} arrowLeft onClick={ () => logout() } />
                </Group>
            </Card>
        )
    }

    return (
        <Card sx={{ width: "100%", padding: 0}}>
            <NavButton icon={<User size={20} />} label={name} arrow onClick={ () => setExpand(true) }  />
        </Card>
    )
}

export default UserNav