import React from 'react';
import { Divider, ScrollArea } from '@mantine/core'
import usePageFrame from 'helpers/usePageFrame'

export const SectionFrame = props => {

    const { stacksWidth} = usePageFrame()

    return (
        <ScrollArea scrollbarSize={2} style={{  width: "100%", overflowX: "hidden", flexDirection:"column", display: "flex", flexGrow: 1 }} >   
            { props.title && <Divider variant="dashed" label={props.title} style={{ paddingTop: 16, paddingBottom: 4,  margin: "0 auto", width: "100%", maxWidth: stacksWidth }} /> }
            { props.children}
        </ScrollArea>
    );
}

export default SectionFrame
