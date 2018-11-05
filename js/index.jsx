import React from 'react';
import ReactDOM from "react-dom";
import SofaApp from './sofaApp';
import { DataProvider } from './dataContext';
import { ThemeWrapper } from './themeWrapper';

const rootElement = document.querySelector('#root');

if (rootElement) {
    ReactDOM.render(
        <DataProvider>
            <ThemeWrapper>
                <SofaApp />
            </ThemeWrapper>
        </DataProvider>
    , rootElement);
}

      