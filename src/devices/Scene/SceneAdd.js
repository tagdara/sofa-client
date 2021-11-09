import React, { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListIcon from '@mui/icons-material/List';
import ListItemIcon from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import TextField from '@mui/material/TextField';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import ToggleAvatar from 'components/ToggleAvatar';
import GridItem from "components/GridItem"

export default function Scene(props) {
    
    const [newName, setNewName] = useState('')

    function snapScene(sceneName) {
        props.directive(props.area.endpointId,'AreaController','Snapshot', newName)
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