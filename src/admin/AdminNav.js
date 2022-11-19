import React from 'react';
import { NavLink } from '@mantine/core';
import { selectPage } from 'helpers/layoutHelpers';
import { IconStack3, IconAdjustments, IconCalendarTime, IconCloudDataConnection, IconIdBadge } from '@tabler/icons';

const AdminNav = props => {


    function toggleLogSSE() {
        // needs to be re-implemented if needed
    }

    return (
        <NavLink 
            label="Admin Settings" 
            childrenOffset={16}
            icon={<IconIdBadge size={20} stroke={1.5} />}
        >
            <NavLink icon={<IconStack3 size={16} />} label={"Adapter management"} onClick={() => selectPage('AdapterLayout')} /> 
            <NavLink icon={<IconAdjustments size={16}/>} label={"Postures"} onClick={()=> selectPage('PosturePage')} /> 
            <NavLink icon={<IconCalendarTime size={16}/>} label={"Recent Activity"} onClick={() => selectPage('RecentLayout')} /> 
            <NavLink icon={<IconCloudDataConnection size={16}/>} label={"Toggle SSE Log"} onClick={() => toggleLogSSE()} /> 
        </NavLink>
    )

}

export default AdminNav