import React from 'react';
import { NavLink } from '@mantine/core';
import { selectPage } from 'helpers/layoutHelpers';
import { IconStack3, IconAdjustments } from '@tabler/icons';
import NotificationTest from 'user/NotificationTest'

const AdminNav = props => {

    return (
        <>
            <NavLink icon={<IconStack3 size={20} />} label={"All Devices"} onClick={() => selectPage('EndpointPage')} /> 
            <NavLink icon={<IconAdjustments size={20}/>} label={"Postures"} onClick={()=> selectPage('PosturePage')} /> 
            <NavLink icon={<IconStack3 size={20} />} label={"Adapters"} onClick={() => selectPage('AdapterLayout')} /> 
            { 1 === 2 && <NotificationTest /> }
        </>
    )
}

export default AdminNav