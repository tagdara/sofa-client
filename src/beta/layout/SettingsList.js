import React from 'react';
import { Flag, XSquare  } from 'react-feather';
import NavButton from 'beta/layout/NavButton'
import FrameNavTitle from 'beta/layout/FrameNavTitle'
import { ScrollArea } from '@mantine/core';

export default function SettingsList(props) {

    return (
        <>
            <FrameNavTitle title={"Jukebox Settings"} />
            <ScrollArea>
                <NavButton transparent color="green" icon={<Flag size={20}/>} arrow label="Go"/> 
                <NavButton transparent color="red" label={"Stop"} icon={<XSquare size={20} />} /> 
            </ScrollArea>
        </>
    )
    
}