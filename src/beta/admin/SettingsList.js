import React from 'react';
import { Activity, Clock, Layers, Sliders  } from 'react-feather';
import NavButton from 'beta/layout/NavButton'
import FrameNavTitle from 'beta/layout/FrameNavTitle'
import { ScrollArea } from '@mantine/core';
import { selectPage } from 'beta/helpers/layoutHelpers'

export default function SettingsList(props) {

    function toggleLogSSE() {
        // needs to be re-implemented if needed
    }

    return (
        <>
            <FrameNavTitle title={"Admin"} />
            <ScrollArea>
                <NavButton transparent color="primary" icon={<Layers size={20} />} arrow label={"Adapter management"} onClick={() => selectPage('AdapterLayout')} /> 
                <NavButton transparent color="green" icon={<Sliders size={20}/>} arrow label={"Modes"} onClick={()=> selectPage('ModePage')} /> 
                <NavButton transparent color="green" icon={<Clock size={20}/>} arrow label={"Recent Activity"} onClick={() => selectPage('RecentLayout')} /> 
                <NavButton transparent color="green" icon={<Activity size={20}/>} arrow label={"Toggle SSE Log"} onClick={() => toggleLogSSE()} /> 
            </ScrollArea>
        </>
    )
    
}