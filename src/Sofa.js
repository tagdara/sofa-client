import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";

import DeviceProvider from 'context/DeviceContext';
import DeviceStateProvider from 'context/DeviceStateContext';
import { LayoutProvider } from 'layout/LayoutProvider';
import UserProvider from 'user/UserProvider';
import SofaThemeProvider from 'theme/SofaTheme';
import NetworkProvider from 'network/NetworkProvider';

import SofaFrame from "layout/SofaFrame";
import ErrorBoundary from 'error/ErrorBoundary'

export default function Sofa(props) {

    return (
        <NetworkProvider>
            <DeviceProvider>
                <UserProvider>
                    <SofaThemeProvider>
                        <LayoutProvider>
                            <DeviceStateProvider>
                                <ErrorBoundary>
                                    <SofaFrame />
                                </ErrorBoundary>
                            </DeviceStateProvider>
                            <CssBaseline />
                        </LayoutProvider>
                    </SofaThemeProvider>    
                </UserProvider>
            </DeviceProvider>
        </NetworkProvider>
    )
}

