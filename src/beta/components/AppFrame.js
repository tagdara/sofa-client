import React from 'react';

import { AppShell } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import Div100vh from 'react-div-100vh'

const AppFrame = props => {

    //
    // 12/11/2021 Optimal Configuration
    //
    // This AppShell Addresses 4 specific use cases, and it is important to leave most values in place to avoid negative results from various quirks
    // - IOS Fullscreen PWA
    // - IOS in-browser with browser chrome at multiple heights and search bar placements
    // - Chrome Fullscreen
    // - Chrome mobile developer mode
    // 
    // Specific settings in the base HTML and index.css may cause problems with this configuration.  It is recommended to use the following settings:
    // - No CSS in public/index.html, inline or imported
    // - index.css:
    //      body { margin: 0; overflow-y: hidden; overflow-x: hidden; height: 100vh; height: 100%; }
    //      html { margin: 0; touch-action: manipulation; height: 100vh; }
    // 
    // These settings combined with Div100vh and the AppShell configuration here provide a flexible SPA setup that works across multiple platforms without
    // full-screen app bounce or browser chrome overlaps.  

    // When making changes remember to test on all platforms as well as with both short and long content inside of the scrollarea

    return (
        <Div100vh style={{display: "flex", flexDirection: "column", position: "fixed", top: 0, width: "100%"}}>
            <AppShell   
                padding="sm"
                styles={(theme) => ({
                    body: { flex: 1,  // Warning: Removing flex prevents full height growth
                            height:"100%", // Warning: Removing height pushes the bottom bar on IOS
                    },
                    root: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                            overflow: "hidden", // Warning: Removing Overflow hidden covers bottom bar
                            flex: 1,    // Warning: removing flex 1 stops the content from filling the screen in the scroll area
                            flexDirection: "column", // Warning: removing flexdirection breaks widescreen alignment 
                    },
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], 
                            padding: !props.wide ? 4 : undefined,
                            display: "flex", // Warning: removing flexdirection breaks bottombar placement
                            flexDirection: "column", // Warning: removing flexdirection breaks bottombar placement
                    },
                })}
                header={ props.header }
                navbar={ props.navbar }
            >
                    <ScrollArea scrollbarSize={2} style={{ display: "flex", flexGrow: 1 }} >   
                        { props.children }                                                          
                    </ScrollArea>
                    { (!props.wide && props.bottom) && props.bottom }
                    { props.drawer }
            </AppShell>
        </Div100vh>
    );
}

export default AppFrame

