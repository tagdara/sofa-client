import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CloudIcon from '@material-ui/icons/Cloud';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => {
    
    return {
        reconnectProgress: {
            color: "#F00",
            position: 'absolute',
            top: 28,
            left: '50%',
            width:16,
            height: 16,
            marginLeft: -28,
            zIndex: 21,
            cursor: "pointer",
        },
        reconnectButton: {
            backgroundColor: "#600",
            position: 'absolute',
            top: 28,
            left: '50%',
            marginLeft: -28,
            zIndex: 20,

        },
    }
});

export default function ReconnectButton(props) {
    
    const classes = useStyles();
    
    function reloadPWA() {
        localStorage.removeItem('deviceStates');
        localStorage.removeItem('devices')
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }
    
    return (
        <>
            <Fab aria-label="save" color="primary" className={classes.reconnectButton} onClick={reloadPWA} ><CloudIcon /></Fab>
            <CircularProgress size={56} className={classes.reconnectProgress} onClick={reloadPWA} />
        </>
    );
}
