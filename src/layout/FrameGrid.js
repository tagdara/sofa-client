import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

import useLayoutStore from 'store/layoutStore'
import { renderSuspenseModule } from 'helpers/layoutHelpers';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

import FrameHeader from 'layout/FrameHeader';
import FrameNav from 'layout/FrameNav';
import RightDrawer from 'layout/RightDrawer';
import BottomBar from 'layout/BottomBar';
import DataRefresher from 'layout/DataRefresher';
import AppFrame from 'components/AppFrame'


export default function MainPage() {

    
    const wide = useMediaQuery('(min-width: 640px)');
    const opened = useLayoutStore( state => state.drawerOpen)
    const setOpened = useLayoutStore( state => state.setDrawerOpen)
    const [ drawerOpened, setDrawerOpened] = useState(wide)
    const { streamConnected } = useStream(storeUpdater)

    const currentPage = useLayoutStore(state => state.currentPage)
    const currentProps = useLayoutStore(state => state.currentProps)    

    return (
        <AppFrame   bottom={ <BottomBar open={ () => setOpened(true) } />} 
                    header={ <FrameHeader connected={streamConnected} opened={opened} setOpened={setOpened} />}
                    navbar={ <FrameNav opened={ opened } close={ () => setOpened(false) } />}
                    drawer={ <RightDrawer opened={drawerOpened} close={ () => setDrawerOpened(false) } /> }
                    wide={wide}
        >
            <div style={{ height: 1, paddingTop: "env(safe-area-inset-top)"}} />
            { renderSuspenseModule(currentPage, currentProps) } 
            <DataRefresher />  
        </AppFrame>
    );
}


