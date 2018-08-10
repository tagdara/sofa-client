
import React from 'react';
import ReactDOM from "react-dom";
import DeviceApp from './deviceapp';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from './theme';

const rootElement = document.querySelector('#root');

if (rootElement) {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <DeviceApp />
        </MuiThemeProvider>
    , rootElement);
}

      