import React, { useState } from 'react';

import { Divider, Stack, ScrollArea } from '@mantine/core';
import UserNav from 'layout/UserNav';
import AdminNav from 'admin/AdminNav'
import Favorites from 'user/favorites/Favorites';
import SettingsList from 'admin/SettingsList'
import ActivitiesAllButton from 'activity/ActivitiesAllButton';
import ActivitiesFavoritesButton from 'activity/ActivitiesFavoritesButton';

const SystemPage = props => {

    const [ navMode, setNavMode] = useState('activities')
    const powerUser = true

    return (
        <Stack spacing={"xs"} style={{ width: "100%", paddingTop: 8, paddingBottom: "calc(env(safe-area-inset-bottom) + 32px)" }}>
            <UserNav expand={navMode === "user"} action={ () => setNavMode('user')} />
            <Divider style={{margin: "0 12px" }} labelPosition="center" label={"v"+process.env.REACT_APP_VERSION}/>
            { powerUser &&
                <AdminNav expand={navMode === "user"} action={ () => setNavMode('user')} />
            }
            { powerUser &&
                <ActivitiesAllButton />
                
            }
            <Divider style={{margin: 12 }} />
            <ActivitiesFavoritesButton />
        </Stack>
    )
}

export default SystemPage