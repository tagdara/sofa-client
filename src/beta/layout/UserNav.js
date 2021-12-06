import React, { useState } from 'react';
import NavButton from 'beta/layout/NavButton';
import { Card } from '@mantine/core';
import { User } from 'react-feather';

const UserNav = props => {

    const [ expand, setExpand] = useState(false)
    const name = "user"

    if (expand) {
        return (
            <Card sx={{ padding: 0}}>
                <NavButton avatar={<User size={20} />} label={name} arrowLeft onClick={ () => setExpand(false) } />
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