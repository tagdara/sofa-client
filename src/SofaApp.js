import React from 'react';
import { useState, useEffect } from 'react';

import MasterButton from "./MasterButton"
import SofaAppContent from "./SofaAppContent";
import ErrorBoundary from './ErrorBoundary'
import CssBaseline from "@material-ui/core/CssBaseline";
import DataProvider from './DataContext/DataProvider';
import { LayoutProvider } from './layout/NewLayoutProvider';
import UserProvider from './user/UserProvider';
import SofaThemeProvider from './theme/SofaTheme';


function MainApp(props) {
    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const isMobile = screenWidth <= 800;

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
    }, []);
    
    function handleDrawerOpen() {
        setDrawerOpen(!drawerOpen);
    };

    function handleWindowSizeChange() {
        setScreenWidth(window.innerWidth);
    };

    return (
            <UserProvider>
                <LayoutProvider>
                    <DataProvider>
                        <MasterButton open={handleDrawerOpen} mobile={isMobile}/>
                        <ErrorBoundary>
                            <SofaAppContent />
                        </ErrorBoundary>    
                    </DataProvider>
                    <CssBaseline />
                </LayoutProvider>
            </UserProvider>
    )
}

export default function SofaApp(props) {

    return (
        <SofaThemeProvider>
            <MainApp />
        </SofaThemeProvider>
    );

}

