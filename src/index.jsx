import React from 'react';
import ReactDOM from "react-dom";
import SofaApp from './SofaApp';

import SofaThemeProvider from './theme/SofaTheme';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

const rootElement = document.querySelector('#root');

if (rootElement) {
    ReactDOM.render(
        <SofaThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <SofaApp />
                </AuthProvider>
            </BrowserRouter>
        </SofaThemeProvider>
    , rootElement);
}

      