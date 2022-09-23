import React, { useState } from 'react';

import { Stack, ScrollArea } from '@mantine/core';
import UserNav from 'layout/UserNav';
import AdminNav from 'admin/AdminNav'
import Favorites from 'user/favorites/Favorites';
import SettingsList from 'admin/SettingsList'
import ActivitiesAllButton from 'activity/ActivitiesAllButton';

const SystemPage = props => {

    const [ navMode, setNavMode] = useState('activities')
    const powerUser = true

    return (
        <Stack style={{ width: "100%", paddingTop: 8, paddingBottom: "calc(env(safe-area-inset-bottom) + 32px)" }}>
            <UserNav expand={navMode === "user"} action={ () => setNavMode('user')} />
            { powerUser &&
                <AdminNav expand={navMode === "user"} action={ () => setNavMode('user')} />
            }
            { powerUser &&
                <ActivitiesAllButton />
                
            }
            <ScrollArea style={{ width: "100%" }}>
                { ( navMode === "activities" ) && <Favorites /> }
                { ( navMode === "settings" && powerUser ) && <SettingsList /> }
            </ScrollArea>
        </Stack>
    )
}

export default SystemPage