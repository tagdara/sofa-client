import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";

import DeviceProvider from 'DataContext/DeviceProvider';
import DataProvider from 'DataContext/DataProvider';
import { LayoutProvider } from 'layout/LayoutProvider';
import UserProvider from 'user/UserProvider';
import SofaThemeProvider from 'theme/SofaTheme';
import NetworkProvider from 'network/NetworkProvider';

import SofaFrame from "layout/SofaFrame";
import ErrorBoundary from 'error/ErrorBoundary'

export default function SofaApp(props) {

    return (
        <NetworkProvider>
            <DeviceProvider>
                <UserProvider>
                    <SofaThemeProvider>
                        <LayoutProvider>
                            <DataProvider>
                                <ErrorBoundary>
                                    <SofaFrame />
                                </ErrorBoundary>
                            </DataProvider>
                            <CssBaseline />
                        </LayoutProvider>
                    </SofaThemeProvider>    
                </UserProvider>
            </DeviceProvider>
        </NetworkProvider>
    )
}

