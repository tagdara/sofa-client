import React, { useEffect, useState} from 'react';
import { Group, Transition } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks'
import usePageFrame from 'helpers/usePageFrame'

const PageFrame = props => {
    const { stacksWidth } = usePageFrame()
    const wide = useMediaQuery('(min-width: 640px)');
    // Used to fill in the space between the top of the screen and possible navbar and the bottom of the screen and the potential bottombar
    // <Group direction="column" noWrap style={{ width: "100%", overflow: "hidden", paddingBottom: 8 }}></Group>

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    // eslint-disable-next-line 
    }, []);

    return (
        <Transition mounted={ mounted }  transition={"fade"} duration={100} timingFunction="ease">
            {(styles) => 
                <Group  direction="column" 
                        noWrap 
                        style={{ 
                            ...styles, 
                            maxWidth: props.maxWidth ? props.maxWidth : stacksWidth, 
                            height: "100%", 
                            overflow: "hidden", 
                            margin: "0 auto", 
                            width: "100%", 
                            paddingBottom : wide ? 64 : 8,
                            position: "relative",
                            boxSizing: "border-box",
                        }} 
                >
                    { props.children}
                    { props.padScroll && <div style={{ height: props.padScroll }} /> }
                </Group>
            }
        </Transition>
    )
}


// We should probably be using this instead 
//export const PageFrame = props => {

//    const wide = useMediaQuery('(min-width: 640px)');

    // TODO - this padding is a shim for bad flexbox alignment at the top level
//    return  <Group direction="column" noWrap style={{ height: "100%", overflow: "hidden", margin: "0 auto", width: "100%", paddingBottom : wide ? 64 : undefined }} >
//                { props.title && <SectionHeader title={props.title} /> }
//                <ScrollArea scrollbarSize={2} style={{  width: "100%", flexDirection:"column", display: "flex", flexGrow: 1 }} >   
//                    <SectionFrame last={true} {...props} />
//                </ScrollArea>
//            </Group>
//}


export default PageFrame
