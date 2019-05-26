import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withThemeChange } from './theme/SofaTheme';
import { withLayout } from './layout/NewLayoutProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import TuneIcon from '@material-ui/icons/Tune';
import HistoryIcon from '@material-ui/icons/History';
import CompareIcon from '@material-ui/icons/Compare';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
        
    listItem: { minHeight: 48,
    },
    list: {
        minWidth: 320,
    },
    top: {
        paddingTop: "env(safe-area-inset-top)",
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-end',
    },
});    


function Sidebar(props) {
    
    const classes = useStyles();

    function handleDialog(dialog) {
        props.handleDialog(dialog)
        props.close()
    }
    
    function selectLayoutCard(layout, cardprops) {
        props.applyLayoutCard(layout, cardprops)
        props.close()
    }
    
    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    return (

        <Drawer open={props.open} onClose={props.close} classes={{ paper: classes.drawerPaper,}} >
            <Toolbar className={classes.top} >
            <IconButton onClick={props.close}>
                <ChevronLeftIcon />
            </IconButton>
            </Toolbar>
            <List role="button" onClick={props.close} onKeyDown={props.close}>
                <ListItem button onClick={() => selectLayoutCard('AutomationsLayout')}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Automation'} />
                </ListItem>
                <ListItem button onClick={() => props.applyTheme(props.colorScheme=='dark' ? 'light' : 'dark')}>
                    <ListItemIcon>
                        <CompareIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.colorScheme=='dark' ? 'Light Mode' : 'Dark Mode'} />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={'User Options'} />
                </ListItem>
                <ListItem button onClick={() => selectLayoutCard('AdapterLayout')}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Adapters'} />
                </ListItem>
                <ListItem className={classes.listItem} />
                <ListItem button onClick={()=> otherPort('8443','_editor')}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Editor'} />
                </ListItem>

            </List>
        </Drawer>
    );
}

export default withLayout(withThemeChange(Sidebar));

