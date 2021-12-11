import React, { useState } from 'react';

import { AppShell } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Group, ScrollArea } from '@mantine/core';
import useLayoutStore from 'store/layoutStore'
import { renderSuspenseModule } from 'beta/helpers/layoutHelpers'

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

import FrameHeader from 'beta/layout/FrameHeader'
import FrameNav from 'beta/layout/FrameNav'
import RightDrawer from 'beta/layout/RightDrawer'
import MobileFrame from 'beta/layout/MobileFrame'
import WideFrame from 'beta/layout/WideFrame'
import BottomBar from 'beta/layout/BottomBar'
import DataRefresher from 'beta/layout/DataRefresher'

export default function MainPage() {

    const wide = useMediaQuery('(min-width: 640px)');
    const [ opened, setOpened] = useState(false)
    const [ drawerOpened, setDrawerOpened] = useState(wide)
    const { streamConnected } = useStream(storeUpdater)

    const currentPage = useLayoutStore(state => state.currentPage)
    const currentProps = useLayoutStore(state => state.currentProps)    

    return (
        <AppShell   padding="sm"
                    styles={(theme) => ({
                        body: { height: "100%", width: "100%"},
                        root: { display: "flex", flexDirection: "column", flexGrow: 1, maxHeight: "100%", height: "100%"},
                        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], padding: !wide ? 2 : undefined },
                    })}
                    header={ <FrameHeader connected={streamConnected} opened={opened} setOpened={setOpened} />}
                    navbar={ <FrameNav opened={ opened } />}
        >
            <div style={{ height:"100%", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", maxWidth: "100%"}}>
                <ScrollArea scrollbarSize={2} style={{ maxHeight: "100%", height:"100%" }} >
                    { renderSuspenseModule(currentPage, currentProps) }
                </ScrollArea>
                { !wide && <BottomBar /> }
                <DataRefresher />
            </div>
            <RightDrawer opened={drawerOpened} close={ () => setDrawerOpened(false) } />
        </AppShell>
    );
}


