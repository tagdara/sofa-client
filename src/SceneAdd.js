import React, { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListIcon from '@material-ui/icons/List';
import ListItemIcon from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import ToggleAvatar from './ToggleAvatar';
import GridItem from "./GridItem"

export default function Scene(props) {
    
    const [newName, setNewName] = useState('')

    function snapScene(sceneName) {
        props.area.AreaController.directive("Snapshot", newName)
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