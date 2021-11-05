import React, { useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GridItem from 'components/GridItem';

import useUserStore from 'store/userStore';

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
    
    const login = useUserStore( state => state.login )
    const userName = useUserStore( state => state.name )
    const refreshToken = useUserStore( state => state.refresh_token )
    const setLoginMessage = useUserStore( state => state.setLoginMessage )
    const checkToken = useUserStore( state => state.checkToken )
    //const { login, getStorage } = useContext(NetworkContext);
    const [ user, setUser ] = useState(userName)
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
    const classes = useStyles();
 
    useEffect(() => {
        console.log('checking token', userName)
        setLoginMessage('Checking token', userName)
        checkToken(userName, refreshToken)
    // eslint-disable-next-line         
    }, [])        

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
        <Grid container spacing={2} >
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
            </Grid>
    )
};