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
import useLoginStore from 'store/loginStore';

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
    
    const login = useLoginStore( state => state.login )
    const loginMessage = useLoginStore( state => state.login_message )
    const userName = useUserStore( state => state.name )
    const setLoginMessage = useLoginStore( state => state.setLoginMessage )
    const checkToken = useLoginStore( state => state.checkToken )
    const [ user, setUser ] = useState(userName)
    const [ password, setPassword ] = useState('')
    const classes = useStyles();
 
    useEffect(() => {
        console.log('checking token', userName)
        setLoginMessage('Checking token', userName)
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
                        <ListItemText primary={loginMessage} />
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