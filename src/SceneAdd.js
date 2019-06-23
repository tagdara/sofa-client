import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListIcon from '@material-ui/icons/List';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemText';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ToggleAvatar from './ToggleAvatar';
import GridItem from "./GridItem"
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({
    
    root: {
        minHeight: 72,
        display: "flex",
        width: "100%",
    },
    listItem: {
        padding: "8 24px",
    },
    working: {
        margin: "4px 20px 4px 4px"
    }
});


export default function Scene(props) {
    
    const classes = useStyles();
    const [newName, setNewName] = useState('')

    function snapScene(sceneName) {
        props.sendAlexaCommand('', props.areaid, "AreaController", "Snapshot", newName)
        props.setNewScene(false)
    }
    
    const handleChange = name => event => {
        setNewName(event.target.value)
    }
    
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar avatarState={'on'} >
                    <ListIcon />
                </ToggleAvatar>
                <TextField id="newscene" label="Name" value={newName} onChange={handleChange('name')} margin="normal"/>
                <ListItemSecondaryAction>
                    <ListItemIcon  onClick={() => snapScene(newName) }>
                        <CheckIcon />
                    </ListItemIcon>
                    <ListItemIcon  onClick={() => props.setNewScene(false) }>
                        <CloseIcon />
                    </ListItemIcon>
                </ListItemSecondaryAction>
            </ListItem>
        </GridItem >
    )
};


