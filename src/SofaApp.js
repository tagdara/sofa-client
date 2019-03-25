import React, { Component, memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Sidebar from './Sidebar';
import SofaAppBar from "./SofaAppBar";
import SofaAppContent from "./SofaAppContent";
import ErrorBoundary from './ErrorBoundary'
import CssBaseline from "@material-ui/core/CssBaseline";
import DataProvider from './DataContext/DataProvider';
import SofaLogin from './SofaLogin';
import { Redirect, Route } from 'react-router-dom';
import { AuthConsumer } from './auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    
    <AuthConsumer>
        { ({ isAuth }) => (
            <Route render={ props => isAuth() 
                ? <Component {...props} /> 
                : <Redirect to="/login" />
            } {...rest} />
        )}
    </AuthConsumer>
    
);

function MainApp(props) {
    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const isMobile = screenWidth <= 800;

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
    }, []);
    
    function handleDrawerOpen() {
        setDrawerOpen(!drawerOpen);
    };

    function handleDrawerClose() {
        setDrawerOpen(false);
    };
    
    function handleWindowSizeChange() {
        setScreenWidth(window.innerWidth);
    };

    return (
        <DataProvider>
            <SofaAppBar open={handleDrawerOpen} mobile={isMobile}/>
            <Sidebar open={drawerOpen} close={handleDrawerClose} />
            { !isMobile && <Toolbar /> }
            <ErrorBoundary>
                <SofaAppContent toggleSidebar={handleDrawerOpen} closeSidebar={handleDrawerClose}/>
            </ErrorBoundary>    
           <CssBaseline />
        </DataProvider>
    )
}

function LoginRouter(props) {
    
    return (
        <React.Fragment>
            <Route exact path="/" render={( () => (1==1 ? <MainApp /> : <SofaLogin setLoggedIn={setLoggedIn} />))} />
            <Route exact path="/login" render={(props) => <SofaLogin { ...props} setLoggedIn={setLoggedIn} />} />
        </React.Fragment>
    )
}

export default function SofaApp(props) {

    return (
            <React.Fragment>
                <ProtectedRoute exact path="/" component={MainApp} />
                <Route exact path="/login" component={SofaLogin} />
            </React.Fragment>
    );

}

