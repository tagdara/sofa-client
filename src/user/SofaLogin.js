import React, { useEffect, useState, useContext } from 'react';
import { SofaThemeContext } from 'theme/SofaTheme';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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

    const { theme } = useContext(SofaThemeContext)   
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
        <ThemeProvider theme={ theme }>
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
            <CssBaseline />
        </ThemeProvider>
    )
};