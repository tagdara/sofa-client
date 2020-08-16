import React from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ThemeContext } from './theme/SofaTheme';
import { NetworkContext } from './NetworkProvider';

import CompareIcon from '@material-ui/icons/Compare';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => {
    return {   
        iconRow: {
            display: "flex",
            padding: 16,
        },
        spacer: {
            flexGrow:1
        },
        systemButton: {
            marginRight: 8,
        }
    }
})

export default function SystemButtons(props) {
    
    const classes = useStyles();
    const { logout } = useContext(NetworkContext);
    const { pickUserTheme, colorScheme } = useContext(ThemeContext);
    
    function devBuild(portnumber, tabname) {
        var newurl="http://"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }

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
        <div className={classes.iconRow} >
            <IconButton className={classes.systemButton} onClick={() => pickUserTheme(colorScheme==='dark' ? 'light' : 'dark')}>
                <CompareIcon />
            </IconButton >
            <IconButton className={classes.systemButton} onClick={() => reloadPWA() }>
                <RefreshIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => devBuild('3000','_devsofa')}>
                <DeveloperBoardIcon />
            </IconButton>
            <div className={classes.spacer}></div>
            <IconButton className={classes.systemButton} onClick={()=> logout()}>
                <ExitToAppIcon />
            </IconButton>
        </div>
    )
};