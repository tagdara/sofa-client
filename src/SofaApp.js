import React, { Component, memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from '@material-ui/core/Toolbar';
import NewAppBar from "./NewAppBar";
import SofaAppContent from "./SofaAppContent";
import ErrorBoundary from './ErrorBoundary'
import CssBaseline from "@material-ui/core/CssBaseline";
import DataProvider from './DataContext/DataProvider';
import LayoutProvider from './layout/NewLayoutProvider';
import UserProvider from './user/UserProvider';

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
            <UserProvider>
                <LayoutProvider>
                    <NewAppBar open={handleDrawerOpen} mobile={isMobile}/>
                    { !1==1 && <Toolbar /> }
                    <ErrorBoundary>
                        <DataProvider>
                            <SofaAppContent />
                        </DataProvider>
                    </ErrorBoundary>    
                   <CssBaseline />
                </LayoutProvider>
            </UserProvider>
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

