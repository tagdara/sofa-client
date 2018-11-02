
import React from 'react';
import ReactDOM from "react-dom";
import DeviceApp from './deviceapp';
import { DataProvider } from './dataContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import CssBaseline from "@material-ui/core/CssBaseline";

const rootElement = document.querySelector('#root');

if (rootElement) {
    ReactDOM.render(
        <MuiThemeProvider theme={lightTheme}>
            <React.Fragment>
                <DataProvider>
                    <DeviceApp />
                </DataProvider>
            <CssBaseline />
            </React.Fragment>
        </MuiThemeProvider>
    , rootElement);
}

      