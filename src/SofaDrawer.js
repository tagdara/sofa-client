import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { ThemeContext } from './theme/SofaTheme';

import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';

import Stack from './Stack';

import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CompareIcon from '@material-ui/icons/Compare';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Scrollbars } from 'react-custom-scrollbars';

const drawerWidth = 400;

const useStyles = makeStyles(theme => {
    
    return {
        drawerScroll: {
            overflowX: "hidden",
            overflowY: "auto",
        },
        drawerPaper: {
            backgroundColor: theme.palette.layer.section,
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
    
    const { drawerOpen, toggleDrawer } = useContext(LayoutContext);
    const { pickUserTheme, colorScheme } = useContext(ThemeContext);
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
