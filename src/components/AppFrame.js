import React from 'react';
import { AppShell } from '@mantine/core';
//import { useViewportSize } from '@mantine/hooks';

const AppFrame = props => {
    
    //const { height } = useViewportSize();

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

    // 12/20/21 Changed root to be position fixed with 0 edges to mitigate a white bar that sometimes
    // appears on IOS when pinned to home screen

    // Notice that the height calculated by 100vh and useViewportsize is inconsistent between
    // loads in mobile safari when pinned.  clearly a bug or race condition

    //<ScrollArea scrollbarSize={2} style={{ display: "flex", flexGrow: 1 }} >   
    //   { props.children }                                                          
    //</ScrollArea>

    return (
            <AppShell   
                padding="sm"
                styles={(theme) => ({
                    body: { flex: 1,  // Warning: Removing flex prevents full height growth
                            height:"100%", // Warning: Removing height pushes the bottom bar on IOS
                            position: "relative",
                            width: "100%",
                        },
                    root: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                            overflow: "hidden", // Warning: Removing Overflow hidden covers bottom bar
                            flex: 1,    // Warning: removing flex 1 stops the content from filling the screen in the scroll area
                            flexDirection: "column", // Warning: removing flexdirection breaks widescreen alignment 
                            position: "fixed",
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                        },
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], 
                            //padding: !props.wide ? 4 : undefined,
                            paddingBottom:  !props.wide ? 4 : undefined,
                            display: "flex", // Warning: removing flexdirection breaks bottombar placement
                            flexDirection: "column", // Warning: removing flexdirection breaks bottombar placement
                            maxWidth: "100%",
                    },
                })}
                header={ props.header }
                navbar={ props.navbar }
            >       
                    <div style={{ overflow: "hidden", flexDirection: "column", display: "flex", flexGrow: 1 }}> 
                        { props.children }                                                          
                    </div>
                    { (!props.wide && props.bottom) && props.bottom }
                    { props.drawer }
            </AppShell>

    );
}

export default AppFrame

