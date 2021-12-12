import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

import useLayoutStore from 'store/layoutStore'
import { renderSuspenseModule } from 'beta/helpers/layoutHelpers'

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

import FrameHeader from 'beta/layout/FrameHeader'
import FrameNav from 'beta/layout/FrameNav'
import RightDrawer from 'beta/layout/RightDrawer'
import BottomBar from 'beta/layout/BottomBar'
import DataRefresher from 'beta/layout/DataRefresher'
import AppFrame from 'beta/components/AppFrame'


export default function MainPage() {

    const wide = useMediaQuery('(min-width: 640px)');
    const [ opened, setOpened] = useState(false)
    const [ drawerOpened, setDrawerOpened] = useState(wide)
    const { streamConnected } = useStream(storeUpdater)

    const currentPage = useLayoutStore(state => state.currentPage)
    const currentProps = useLayoutStore(state => state.currentProps)    

    return (
        <AppFrame   bottom={ <BottomBar />} 
                    header={ <FrameHeader connected={streamConnected} opened={opened} setOpened={setOpened} />}
                    navbar={ <FrameNav opened={ opened } />}
                    drawer={ <RightDrawer opened={drawerOpened} close={ () => setDrawerOpened(false) } /> }
                    wide={wide}
        >
            { renderSuspenseModule(currentPage, currentProps) } 
            <DataRefresher />  
        </AppFrame>
    );
}


