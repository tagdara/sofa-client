import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import SofaThemeProvider from 'theme/SofaTheme';

import SofaFrame from "layout/SofaFrame";
import SofaLogin from "user/SofaLogin";
import ErrorBoundary from 'error/ErrorBoundary'
import useLoginStore from 'store/loginStore'

import AppFrame from 'beta/AppFrame'

const Sofa = (props) => {

    const loggedIn = useLoginStore(state => state.logged_in )
    const beta = window.location.href.includes('?beta')

    if (beta && !loggedIn) {
        return <SofaThemeProvider><SofaLogin /></SofaThemeProvider>
    }

    if (beta) { 
        return <AppFrame />
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