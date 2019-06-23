import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withThemeChange } from './theme/SofaTheme';
import { withLayout } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridSection from './GridSection';
import GridItem from './GridItem';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import TuneIcon from '@material-ui/icons/Tune';
import HistoryIcon from '@material-ui/icons/History';
import CompareIcon from '@material-ui/icons/Compare';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    button: {
        minWidth: 36
    },
    buttonspacer: {
        minWidth: 36,
        marginRight: 18
    },

});

function SystemLayout(props) {

    const classes = useStyles();

    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    return (    
        <GridSection name={"System"} >
            <GridItem>
                <ListItem onClick={() => props.applyTheme(props.colorScheme=='dark' ? 'light' : 'dark')}>
                    <ListItemIcon>
                        <CompareIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.colorScheme=='dark' ? 'Light Mode' : 'Dark Mode'} secondary={'Change interface color to suit your surroundings'} />
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={() => props.applyLayoutCard('AdapterLayout')}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Adapters'} secondary={'Check the status or restart an adapter.'}/>
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={()=> otherPort('8443','_editor')}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Editor'} secondary={'Edit Sofa code and view logs.'}/>
                </ListItem>
            </GridItem>

        </GridSection>
    )
};

export default withLayout(withThemeChange(SystemLayout));