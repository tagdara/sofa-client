import React from 'react';
import NavButton from 'layout/NavButton';
import { Stack } from '@mantine/core';
import { selectPage } from 'helpers/layoutHelpers';
import { IconActivity, IconClock, IconStack3, IconAdjustments } from '@tabler/icons';

export default function SettingsList(props) {

    function toggleLogSSE() {
        // needs to be re-implemented if needed
    }

    return (
        
        <Stack spacing={2} style={{ paddingTop: 16 }} >
            <NavButton transparent color="primary" icon={<IconStack3 size={20} />} arrow label={"Adapter management"} onClick={() => selectPage('AdapterLayout')} /> 
            <NavButton transparent color="green" icon={<IconAdjustments size={20}/>} arrow label={"Modes"} onClick={()=> selectPage('ModePage')} /> 
            <NavButton transparent color="green" icon={<IconClock size={20}/>} arrow label={"Recent Activity"} onClick={() => selectPage('RecentLayout')} /> 
            <NavButton transparent color="green" icon={<IconActivity size={20}/>} arrow label={"Toggle SSE Log"} onClick={() => toggleLogSSE()} /> 
        </Stack>
    )
    
}