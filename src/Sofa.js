import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";
import { LayoutProvider } from 'layout/LayoutProvider';
import UserProvider from 'user/UserProvider';
import SofaThemeProvider from 'theme/SofaTheme';

import SofaFrame from "layout/SofaFrame";
import SofaLogin from "user/SofaLogin";
import ErrorBoundary from 'error/ErrorBoundary'
import useUserStore from 'store/userStore'

export default function Sofa(props) {

    const loggedIn = useUserStore(state => state.logged_in )

    return (
        <UserProvider>
            <SofaThemeProvider>
                <LayoutProvider>
                    <ErrorBoundary>
                        { loggedIn ?
                            <SofaFrame />
                            :
                            <SofaLogin />
                        }
                    </ErrorBoundary>
                    <CssBaseline />
                </LayoutProvider>
            </SofaThemeProvider>    
        </UserProvider>
    )
}

