import React from 'react';
import { Divider, ScrollArea } from '@mantine/core'
import usePageFrame from 'helpers/usePageFrame'
import useLayoutStore from 'layout/layoutStore'

export const SectionFrame = props => {

    const { stacksWidth} = usePageFrame()
    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const clearPullUp = ( clickEvent ) => {
        // Look for a cleaner way to prevent non-direct clicks
        if (stackPullUp && clickEvent.target.classList.contains('mantine-ScrollArea-viewport')) {
            setStackPullUp(undefined)
            setStackCardHighlight(undefined)
        }
    }

    return (
        <ScrollArea 
            onClick={clearPullUp}
            scrollbarSize={2} 
            style={{  
                width: "100%", 
                overflowX: "hidden", 
                flexDirection:"column", 
                display: "flex", flexGrow: 1,
            }} 
        >   
            { (!stackPullUp && props.title) && <Divider variant="dashed" label={props.title} style={{ paddingTop: 16, paddingBottom: 4,  margin: "0 auto", width: "100%", maxWidth: stacksWidth }} /> }
            { props.children}
            { (!stackPullUp && props.padScroll) && <div style={{ height: typeof props.padScroll==="number" ? props.padScroll : 96  }} /> }
        </ScrollArea>
    );
}

export default SectionFrame
