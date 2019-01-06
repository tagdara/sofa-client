import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../GridItem';

const useStyles = makeStyles({
        

});

export default function AutomationItem(props) {
    
    const classes = useStyles();
    
    return (
        <GridItem wide={props.wide}>
        <ListItem>
        { props.edit ?
            <Avatar onClick={ () => props.delete(props.name)}><CloseIcon /></Avatar>
        :
            <Avatar onClick={ () => props.run(props.name)}><ListIcon /></Avatar>
        }
            <ListItemText primary={props.name} secondary={props.triggerCount+" triggers / "+props.conditionCount+" conditions / "+props.actionCount+' actions'}  onClick={() => props.select(props.name)}/>
        </ListItem>
        </GridItem>
    )
}

