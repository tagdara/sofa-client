import React from 'react';
import { NavLink } from '@mantine/core';
import { PersonBadge } from 'react-bootstrap-icons'
import { Activity, Clock, Layers, Sliders  } from 'react-feather';
import { selectPage } from 'helpers/layoutHelpers';

const AdminNav = props => {


    function toggleLogSSE() {
        // needs to be re-implemented if needed
    }

    return (
        <NavLink 
            label="Admin Settings" 
            childrenOffset={16}
            icon={<PersonBadge size={20} stroke={1.5} />}
        >
            <NavLink icon={<Layers size={16} />} label={"Adapter management"} onClick={() => selectPage('AdapterLayout')} /> 
            <NavLink icon={<Sliders size={16}/>} label={"Modes"} onClick={()=> selectPage('ModePage')} /> 
            <NavLink icon={<Clock size={16}/>} label={"Recent Activity"} onClick={() => selectPage('RecentLayout')} /> 
            <NavLink icon={<Activity size={16}/>} label={"Toggle SSE Log"} onClick={() => toggleLogSSE()} /> 
        </NavLink>
    )

}

export default AdminNav