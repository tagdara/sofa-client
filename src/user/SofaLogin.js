import React, { useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useLoginStore from 'store/loginStore';
import useLayoutStore from 'store/layoutStore';

const useStyles = makeStyles({
    loginBox: {
        margin: 4,
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
    },
    loginPage: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    loginPaper: {
        padding: 16,
        borderRadius: 8,
    }
});

export default function SofaLogin(props) {
    
    const login = useLoginStore( state => state.login )
    const isMobile = useLayoutStore( state => state.isMobile )
    const loginMessage = useLoginStore( state => state.login_message )
    const userName = useLoginStore( state => state.name )
    const checkToken = useLoginStore( state => state.checkToken )
    const [ user, setUser ] = useState(userName)
    const [ password, setPassword ] = useState('')
    const classes = useStyles();
 
    useEffect(() => {
        checkToken()
    // eslint-disable-next-line         
    }, [])        

    function checkLogin() { 
        login(user,password)
    }

    function keyPress(code) {
        if (code===13) {
            checkLogin()
        }
    }

    return (
        <Grid container spacing={2} className={classes.loginPage} >
            <Grid item xs={isMobile ? 12 : 4} className={classes.loginBox}>
                <Paper className={classes.loginPaper}>
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
                        <ListItemText primary={loginMessage} />
                    </ListItem>
                    <ListItem style={{display:'flex', justifyContent:'center'}} >
                        <Button fullWidth onClick={ ()=> checkLogin()}>
                            Login
                        </Button>
                    </ListItem>
                </Paper>
            </Grid>
        </Grid>
    )
};