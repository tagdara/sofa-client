import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withThemeChange } from './DataContext/withThemeChange';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Drawer from '@material-ui/core/Drawer';

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
    drawerHeader: {
        paddingTop: "env(safe-area-inset-top)",
    },

});    


function Sidebar(props) {
    
    const classes = useStyles();

    function handleDialog(dialog) {
        props.handleDialog(dialog)
        props.close()
    }
    
    function selectLayoutCard(layout, cardprops) {
        props.setLayoutCard(layout, cardprops)
        props.close()
    }
    
    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    return (

        <Drawer variant="persistent" open={props.open} classes={{ paper: classes.drawerPaper,}} >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.close}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={() => handleDialog('Automation')}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Automation'} />
                </ListItem>
                <ListItem button onClick={() => selectLayoutCard('AutomationsLayout')}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary={'* Automation'} />
                </ListItem>

                <ListItem button onClick={() => handleDialog('Schedule')}>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Scheduler'} />
                </ListItem>
                <ListItem className={classes.listItem} />
                <Divider />
                <ListItem button onClick={()=> otherPort('8443','_editor')}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Editor'} />
                </ListItem>
                <ListItem className={classes.listItem} />
                <Divider />
                <ListItem button onClick={() => props.setColorScheme(props.colorScheme=='dark' ? 'light' : 'dark')}>
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
            </List>
        </Drawer>
    );
}

export default withThemeChange(Sidebar);

