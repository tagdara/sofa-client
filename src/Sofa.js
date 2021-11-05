import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";
import UserProvider from 'user/UserProvider';
import SofaThemeProvider from 'theme/SofaTheme';

import SofaFrame from "layout/SofaFrame";
import SofaLogin from "user/SofaLogin";
import ErrorBoundary from 'error/ErrorBoundary'
import useUserStore from 'store/userStore'

const Sofa = (props) => {

    const loggedIn = useUserStore(state => state.logged_in )

    return (
        <UserProvider>
            <SofaThemeProvider>
                <ErrorBoundary>
                    { loggedIn ?
                        <SofaFrame />
                        :
                        <SofaLogin />
                    }
                </ErrorBoundary>
                <CssBaseline />
            </SofaThemeProvider>    
        </UserProvider>
    )
}

export default Sofa