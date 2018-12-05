import React from 'react';
import ReactDOM from "react-dom";
import SofaApp from './sofaApp';
import DataProvider from './DataContext/DataProvider';
import ThemeWrapper from './theme/themeWrapper';

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

      