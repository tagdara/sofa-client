
import React, { useContext, useState } from 'react';
import { SofaThemeContext } from 'theme/SofaTheme';
import { makeStyles } from '@mui/styles';

import CardBase from 'components/CardBase';
import CardLine from 'components/CardLine';
import Spacer from 'components/Spacer';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import AccountCircle from '@mui/icons-material/AccountCircle';
import CompareIcon from '@mui/icons-material/Compare';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
    const { pickUserTheme, colorScheme } = useContext(SofaThemeContext);
    const firstName = useUserStore( state => state.preferences.firstname)
    const lastName = useUserStore( state => state.preferences.lastname)
    const logout = useLoginStore( state => state.logout )
    const [ adminMode, setAdminMode ] = useState(false)

    return (
        <CardBase >
            <CardLine>
                <IconButton onClick={props.handleFavorites}>
                    <AccountCircle />
                </IconButton>
                <ListItemText primary={firstName+" "+lastName} />
                <div className={classes.spacer} />
                <IconButton onClick={logout}>
                    <ExitToAppIcon />
                </IconButton>
            </CardLine>
            <CardLine>
                <Button startIcon={<CompareIcon />}  onClick={() => pickUserTheme(colorScheme==='dark' ? 'light' : 'dark')}>
                    { colorScheme==='dark' ? 'Light' : 'Dark' }
                </Button>
                <Spacer />
                <Button variant={ adminMode ? "contained" : null} startIcon={<SettingsIcon />} onClick={ () => setAdminMode(!adminMode) }>
                    Admin
                </Button>
                <Spacer />
                <Button startIcon={<RefreshIcon />} onClick={ reloadPWA} >
                    Reload
                </Button>
            </CardLine>
            { adminMode &&
                <AdminFeatures />
            }
        </CardBase>
    );
}
