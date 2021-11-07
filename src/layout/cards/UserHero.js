
import React, { useContext, useState } from 'react';
import { ThemeContext } from 'theme/SofaTheme';
import { makeStyles } from '@material-ui/styles';

import CardBase from 'components/CardBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';
import CompareIcon from '@material-ui/icons/Compare';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AdminFeatures from 'layout/cards/AdminFeatures';

import useUserStore from 'store/userStore'

const useStyles = makeStyles(theme => {
    return {
        spacer: {
            flexGrow: 1,
        },
        buttonRow: {
            display: "flex",
            justifyContent: "space-between",
        },
        userRow: {
            padding: 8,
        }
    }
})

export default function UserHero(props) {

    const classes = useStyles();
    const { pickUserTheme, colorScheme } = useContext(ThemeContext);
    const userData = useUserStore( state => state)
    const [ adminMode, setAdminMode ] = useState(false)
    const name = userData ? userData.firstname+" "+userData.lastname : "Unknown"

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
        <CardBase >
            <ListItem className={classes.userRow} >
                <IconButton onClick={props.handleFavorites}>
                    <AccountCircle />
                </IconButton>
                <ListItemText primary={name} />
                <div className={classes.spacer} />
                <IconButton onClick={() => pickUserTheme(colorScheme==='dark' ? 'light' : 'dark')}>
                    <ExitToAppIcon />
                </IconButton>
            </ListItem>
            <ListItem className={classes.buttonRow}>
                <Button startIcon={<CompareIcon />}  onClick={() => pickUserTheme(colorScheme==='dark' ? 'light' : 'dark')}>
                    { colorScheme==='dark' ? 'Light' : 'Dark' }
                </Button>
                <Button variant={ adminMode ? "contained" : null} startIcon={<SettingsIcon />} onClick={ () => setAdminMode(!adminMode) }>
                    Admin
                </Button>
                <Button startIcon={<RefreshIcon />} onClick={ reloadPWA} >
                    Reload
                </Button>
            </ListItem>
            { adminMode &&
                <AdminFeatures />
            }
        </CardBase>
    );
}
