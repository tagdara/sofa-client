import React from 'react';

import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { toggleRightDrawer } from 'store/layoutHelpers';
import useLayoutStore from 'store/layoutStore';
import RecentLayout from 'layout/pages/RecentLayout';

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
    }
});

export default function RightDrawer(props) {
    
    const rightDrawerOpen = useLayoutStore(state => state.rightDrawerOpen)
    const classes = useStyles();
    
    return (
        <Drawer anchor='right' open={rightDrawerOpen} onClose={() => toggleRightDrawer(false)} classes={{ paper: classes.drawerPaper, }}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={ () => toggleRightDrawer(false) }>
                    <ChevronRightIcon />
                </IconButton>
            </div>
            <Scrollbars>
                <div className={classes.drawerScroll}>
                    <RecentLayout />
                </div>
            </Scrollbars>
        </Drawer> 
    );
}
