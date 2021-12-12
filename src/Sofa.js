import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import SofaThemeProvider from 'theme/SofaTheme';

import SofaFrame from "layout/SofaFrame";
import SofaLogin from "user/SofaLogin";
import ErrorBoundary from 'error/ErrorBoundary'
import useLoginStore from 'store/loginStore'

import App from 'beta/App'

const Sofa = (props) => {

    const loggedIn = useLoginStore(state => state.logged_in )
    const beta = window.location.href.includes('/beta')

    if (beta) { 
        return <App />
    }

    return (
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
    )
}

export default Sofa