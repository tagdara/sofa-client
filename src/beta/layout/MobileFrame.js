import React from 'react';
import { ScrollArea } from '@mantine/core';
import useLayoutStore from 'store/layoutStore'
//import useUserStore from 'store/userStore'
import { renderSuspenseModule } from 'beta/helpers/layoutHelpers'
import BottomBar from 'beta/layout/BottomBar'


const MobileFrame = props => {

    const currentPage = useLayoutStore(state => state.currentPage)
    const currentProps = useLayoutStore(state => state.currentProps)
    //const refreshUser = useUserStore(state => state.refresh)

    return (
        <>
        <ScrollArea offsetScrollbars style={{ padding: "0 16px"}}>
            { renderSuspenseModule(currentPage, currentProps) }
        </ScrollArea>
        <BottomBar />
        </>
    )
}

export default MobileFrame
