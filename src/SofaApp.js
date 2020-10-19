import React from 'react';

import SofaFrame from "./SofaFrame";
import ErrorBoundary from './ErrorBoundary'
import CssBaseline from "@material-ui/core/CssBaseline";
import DeviceProvider from './DataContext/DeviceProvider';
import DataProvider from './DataContext/DataProvider';
import { LayoutProvider } from './layout/NewLayoutProvider';
import UserProvider from './user/UserProvider';
import SofaThemeProvider from './theme/SofaTheme';
import NetworkProvider from './NetworkProvider';

export default function SofaApp(props) {

    return (
        <NetworkProvider>
            <UserProvider>
                <SofaThemeProvider>
                    <LayoutProvider>
                        <DeviceProvider>
                            <DataProvider>
                                <ErrorBoundary>
                                    <SofaFrame />
                                </ErrorBoundary>
                            </DataProvider>
                        </DeviceProvider>
                        <CssBaseline />
                    </LayoutProvider>
                </SofaThemeProvider>    
            </UserProvider>
        </NetworkProvider>
    )
}

