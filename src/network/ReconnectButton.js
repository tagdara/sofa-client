import React from 'react';
import { makeStyles } from '@mui/styles';
import CloudIcon from '@mui/icons-material/Cloud';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import { reloadPWA } from 'store/userHelpers'

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
    
    return (
        <>
            <Fab aria-label="save" color="primary" className={classes.reconnectButton} onClick={reloadPWA} ><CloudIcon /></Fab>
            <CircularProgress size={56} className={classes.reconnectProgress} onClick={reloadPWA} />
        </>
    );
}
