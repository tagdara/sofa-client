
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
import useLoginStore from 'store/loginStore'
import { reloadPWA } from 'store/userHelpers'

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
    const firstName = useUserStore( state => state.preferences.firstname)
    const lastName = useUserStore( state => state.preferences.lastname)
    const logout = useLoginStore( state => state.logout )
    const [ adminMode, setAdminMode ] = useState(false)

    return (
        <CardBase >
            <ListItem className={classes.userRow} >
                <IconButton onClick={props.handleFavorites}>
                    <AccountCircle />
                </IconButton>
                <ListItemText primary={firstName+" "+lastName} />
                <div className={classes.spacer} />
                <IconButton onClick={logout}>
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
