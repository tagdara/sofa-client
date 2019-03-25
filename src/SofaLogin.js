import React, { Component, createElement  } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ErrorBoundary from './ErrorBoundary'
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridItem from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import { Redirect, Route } from 'react-router-dom'
import { AuthConsumer } from './auth/AuthContext';

const useStyles = makeStyles({
    
    controlArea: {
        margin: "8 auto",
        maxWidth: 1440,
        boxSizing: "border-box",
        overflowY: "auto",
        width: "100%",
    },
    mobileControlArea: {
        margin: "8 auto",
        maxWidth: 600,
        width: "100%",
        marginTop: "env(safe-area-inset-top)",
        paddingTop: 8,
        boxSizing: "border-box",
        overflowY: "auto",
        minHeight: "100%",
        alignContent: "flex-start",
    },
    content: {
        justifyContent: "center",
        flexGrow: 1,
        display: 'flex',
        paddingTop: 64,
        padding: 8,
        marginLeft: 0,
        height: "100%",
    }, 
    loginBox: {
        height: 320,
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
    }
});

export default function SofaLogin(props) {
    
    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        logout()
    },[]);

    function logout() {
        fetch('/logout')
 		    .then(result=>result.json())
            .then(data=>setLoggedIn(data['loggedIn']))
        return true
    }    
    
    return (
        <AuthConsumer>
            { ({ isAuth, login, logout }) => (
                <React.Fragment>
                { isAuth ? 
                    <Redirect push to="/" />
                :
                    <main className={classes.content}>
                        <ErrorBoundary>
                            <Paper className={classes.loginBox}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary={"Sofa Home Automation"} />
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="User"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            type="password"
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </ListItem>
                                    <ListItem>
                                    <Button variant="contained" size="large" color="primary" onClick={ () => login(user, password) } >
                                        Login
                                    </Button>
                                    </ListItem>
                                </List>
                            </Paper>
                        </ErrorBoundary>    
                        <CssBaseline />
                    </main>
                }
                </React.Fragment>
            )}
        </AuthConsumer>
    );
}
