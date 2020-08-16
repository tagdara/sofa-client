import React from 'react';
import { useContext, useState} from 'react';
import { NetworkContext } from './NetworkProvider';
import { makeStyles } from '@material-ui/styles';

import GridItem from './GridItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    form: {
        width: "100%",
    }
});

export default function SofaLogin(props) {
    
    const { login, getStorage } = useContext(NetworkContext);
    const [user, setUser] = useState(getStorage('user'))
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const classes = useStyles();
    
    function confirmToken(result) {
        console.log('resulting token', result)
        if (result) {
            setErrorMessage('')
            window.location.replace(window.location);
        } else {
            setErrorMessage('Incorrect credentials')
        }
    }

    function checkLogin() { 
        login(user,password).then(result=>confirmToken(result))
    }

    function keyPress(code) {
        if (code===13) {
            checkLogin()
        }
    }

    return (
            <>
                <GridItem wide={props.wide} className={classes.loginBox}>
                    <ListItem style={{display:'flex', justifyContent:'center'}} >
                        <Typography variant="h6">Sofa Login</Typography>
                    </ListItem>
                    <ListItem>
                        <TextField fullWidth variant="outlined" onChange={(e) => setUser(e.target.value) } 
                            value={user? user : ""} id="user" label="User" type="mail"  />
                    </ListItem>
                    <ListItem>
                        <TextField fullWidth variant="outlined" onChange={(e) => setPassword(e.target.value)} onKeyDown={ (e) => keyPress(e.keyCode) } 
                            id="password" label="Password" type="password" defaultValue={""}  />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={errorMessage} />
                    </ListItem>
                    <ListItem style={{display:'flex', justifyContent:'center'}} >
                        <Button fullWidth onClick={ ()=> checkLogin()}>
                            Login
                        </Button>
                    </ListItem>
                </GridItem>
            </>
    )
};