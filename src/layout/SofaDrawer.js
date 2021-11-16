import React, { useContext } from 'react';
import { toggleDrawer } from 'store/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { SofaThemeContext } from 'theme/SofaTheme';

import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';

import Stack from 'layout/CardStack';

import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CompareIcon from '@mui/icons-material/Compare';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Scrollbars } from 'react-custom-scrollbars';

const drawerWidth = 400;

const useStyles = makeStyles(theme => {
    
    return {
        drawerScroll: {
            overflowX: "hidden",
            overflowY: "auto",
        },
        drawerPaper: {
            //backgroundColor: theme.palette.layer.section,
            position: 'relative',
            width: drawerWidth,
            border: 0,
            height: "100%"
        },
        drawerHeader: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.contrastText,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px 0 12px',
            ...theme.mixins.toolbar,
        },
        breadCrumbs: {
            display: 'flex',
            alignItems: 'center',
            padding: '4px 16px 4px 16px',
        },
        spacer: {
            flexGrow: 1,
        },
    }
});

export default function SofaDrawer(props) {
    
    const drawerOpen = useLayoutStore( state => state.drawerOpen)
    const { pickUserTheme, colorScheme } = useContext(SofaThemeContext);
    const classes = useStyles();
    
    return (
        <Drawer className={classes.drawer} open={drawerOpen} onClose={() => toggleDrawer(false)} classes={{ paper: classes.drawerPaper, }}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.handleFavorites}>
                    <AccountCircle />
                </IconButton>
                <IconButton onClick={() => pickUserTheme(colorScheme==='dark' ? 'light' : 'dark')}>
                    <CompareIcon />
                </IconButton>
                <div className={classes.spacer} />
                <IconButton onClick={ () => toggleDrawer(false) }>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Scrollbars>
            <div className={classes.drawerScroll}>
                <Stack stack={'System'} showTitle={false} />
            </div>
            </Scrollbars>
        </Drawer> 
    );
}
