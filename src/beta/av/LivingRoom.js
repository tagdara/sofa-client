import React from 'react';
import NavButton from 'beta/layout/NavButton';
import { Card } from '@mantine/core';
import { User } from 'react-feather';

const LivingRoom = props => {

    return (
        <Card sx={{ padding: 0}}>
            <NavButton avatar={<User size={20} />} label={"Jukebox"} arrow   />
            <NavButton avatar={<User size={20} />} label={"Receiver"} arrow   />
            <NavButton avatar={<User size={20} />} label={"TV"} arrow   />
        </Card>
    )
}

export default LivingRoom