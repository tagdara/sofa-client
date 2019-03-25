import React from 'react';
import ReactDOM from "react-dom";
import "./bootstrapStyles"
import SofaApp from './SofaApp';

import SofaTheme from './theme/SofaTheme';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

const rootElement = document.querySelector('#root');

if (rootElement) {
    ReactDOM.render(
        <SofaTheme>
            <BrowserRouter>
                <AuthProvider>
                    <SofaApp />
                </AuthProvider>
            </BrowserRouter>
        </SofaTheme>
    , rootElement);
}

      