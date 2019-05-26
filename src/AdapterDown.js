import React from 'react';
import { useState, useEffect } from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';
import ErrorIcon from '@material-ui/icons/Error';

export default function AdapterDown(props) { 

    return (
        <GridItem wide={props.wide} >
            <ListItem>
                <ToggleAvatar avatarState={"open"}><ErrorIcon /></ToggleAvatar>
                <ListItemText primary={props.name} />
            </ListItem>
            <ListItem button onClick={ () => props.restart(props.name) }>
                <ListItemIcon><ReplayIcon /></ListItemIcon>
                <ListItemText primary={"Start Adapter"} secondary={"Adapter is currently stopped"}/>
            </ListItem>
       </GridItem>
    );
}

