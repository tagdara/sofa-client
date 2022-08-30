import React from 'react';

import { Navbar, Transition } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SystemPage from 'layout/pages/SystemPage'

const FrameNav = props => {

    const wide = useMediaQuery('(min-width: 640px)');
    const powerUser = true

    return (
        <Transition mounted={props.opened} 
                    transition={wide ? "slide-right" : "slide-left"} 
                    duration={200} 
                    timingFunction="ease">
        {( styles) => (
        <Navbar hiddenBreakpoint={4000}
                padding="sm" 
                fixed={false}
                hidden={ !props.opened }
                width={{ sm: 400 }}
                style={{    ...styles,
                            top:64,
                            maxWidth: wide ? "33vw" : undefined,
                            minWidth: wide ? "20vw" : undefined,
                            height: "100%",
                            maxHeight: "100%",
                            overflow: "hidden",
                            boxSizing: "border-box",

                }}
            >
            { powerUser && <SystemPage /> }
        </Navbar>
        )}
        </Transition>
    )
}

export default FrameNav