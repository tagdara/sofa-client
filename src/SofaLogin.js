import React from 'react';
import { useContext, useState} from 'react';
import { NetworkContext } from './NetworkProvider';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import GridItem from './GridItem';
import GridSection from './GridSection';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    loginBox: {
        marginTop: "30%",
        margin: "auto",
    },
    controlArea: {
        height: "90%",
        margin: "8px auto",
        maxWidth: 1440,
        boxSizing: "border-box",
        overflowY: "auto",
        width: "100%",
    },
});

export default function SofaLogin(props) {
    
    const { loggedIn, login } = useContext(NetworkContext);
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();    
    
    function confirmToken(result) {
        console.log('resulting token', result)
        if (result) {
            window.location.replace(window.location);
        }
    }

    function checkLogin() { 
        login(user,password).then(result=>confirmToken(result))
    }

    return (    
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.controlArea} >
            <GridItem wide={props.wide} className={classes.loginBox}>
                <ListItem>
                    <TextField variant="outlined" onChange={(e) => setUser(e.target.value) } 
                        id="user" label="User" type="mail" defaultValue={""} />
                </ListItem>
                <ListItem>
                    <TextField variant="outlined" onChange={(e) => setPassword(e.target.value) } 
                        id="password" label="Password" type="password" defaultValue={""}  />
                </ListItem>
                <ListItem>
                    <Button onClick={ ()=> checkLogin()}>
                        Login
                    </Button>
                </ListItem>
            </GridItem>
        </Grid>
    )
};