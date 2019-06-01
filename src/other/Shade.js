import React from 'react';
import { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Avatar from '@material-ui/core/Avatar';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import TonalityIcon from '@material-ui/icons/Tonality';
import GridItem from '../GridItem';

export default function Shade(props) {
    
    function handlePress(commandName) {
        var command = props.commands[commandName]
        props.sendAlexaCommand(command.name, command.endpointId, command.controller, command.command, command.value)
    }   

    return (
        <GridItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar><TonalityIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name}/>
            <ListItemSecondaryAction>
                <IconButton onClick={ () => handlePress('down') }><ExpandMoreIcon /></IconButton>
                <IconButton onClick={ () => handlePress('stop') }><RemoveIcon /></IconButton>
                <IconButton onClick={ () => handlePress('up') }><ExpandLessIcon /></IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        </GridItem>
    );
}
