import React from 'react';
import { ScrollArea } from '@mantine/core';
import useLayoutStore from 'store/layoutStore'
//import useUserStore from 'store/userStore'
import { renderSuspenseModule } from 'helpers/layoutHelpers';


const WideFrame = props => {

    const currentPage = useLayoutStore(state => state.currentPage)
    const currentProps = useLayoutStore(state => state.currentProps)
    //const refreshUser = useUserStore(state => state.refresh)

    return (
        <ScrollArea offsetScrollbars style={{ padding: "0 16px"}}>
            { renderSuspenseModule(currentPage, currentProps) }
        </ScrollArea>
    )
}

export default WideFrame
