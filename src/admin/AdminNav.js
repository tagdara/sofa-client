import React, { useState } from 'react';
import NavButton from 'layout/NavButton';
import { Card } from '@mantine/core';
import { PersonBadge } from 'react-bootstrap-icons'
import SettingsList from 'admin/SettingsList'

const AdminNav = props => {

    const [ expand, setExpand] = useState(false)

    if (expand) {
        return (
            <Card sx={{ width: "100%", padding: 0}}>
                <NavButton leftArrow icon={<PersonBadge size={20} />} label={"Admin Settings"} onClick={ () => setExpand(false) }  />
                <SettingsList setExpand={setExpand}/>
            </Card>
        )
    }

    return (
        <Card sx={{ width: "100%", padding: 0}}>
            <NavButton highlight arrow icon={<PersonBadge size={20} />} label={"Admin Settings"} onClick={ () => setExpand(true) }  />
        </Card>
    )
}

export default AdminNav