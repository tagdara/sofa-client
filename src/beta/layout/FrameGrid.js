import React, { useState } from 'react';

import { AppShell } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

import FrameHeader from 'beta/layout/FrameHeader'
import FrameNav from 'beta/layout/FrameNav'
import RightDrawer from 'beta/layout/RightDrawer'
import MobileFrame from 'beta/layout/MobileFrame'
import WideFrame from 'beta/layout/WideFrame'

export default function MainPage() {

    const wide = useMediaQuery('(min-width: 640px)');
    const [ opened, setOpened] = useState(wide)
    const [ drawerOpened, setDrawerOpened] = useState(wide)
    const { streamConnected } = useStream(storeUpdater)
    
    return (
        <AppShell   padding="sm"
                    styles={(theme) => ({
                        root: { flexWrap: "nowrap", display: "flex", maxWidth: "100vw", maxHeight: "100vh", height: "100vh", flexDirection: "column"}, 
                        body: { height: "100vh", display: "flex", minHeight: 0},
                        main: { maxWidth: "100%", flexGrow: 1, display: "flex", 
                                minHeight: 0, backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                    })}
                    header={ <FrameHeader connected={streamConnected} opened={opened} setOpened={setOpened} />}
                    navbar={ <FrameNav opened={ opened } />}
        >
            <div style={{ maxWidth: "100%", display: "flex", flexGrow: 1}}>
                { wide ?
                    <WideFrame />
                :
                    <MobileFrame />
                }
            </div>
            <RightDrawer opened={drawerOpened} close={ () => setDrawerOpened(false) } />
        </AppShell>
    );
}


