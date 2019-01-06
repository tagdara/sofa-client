import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import EventIcon from '@material-ui/icons/Event';
import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'

const useStyles = makeStyles({

    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
    },
});


export default function ScheduleStart(props) {
    
    const classes = useStyles();

    function shortTimeFormat(thisdate) {
        if (thisdate) {
            var longdate=thisdate
        } else {
            var longdate=new Date().toISOString().replace('Z','')
        }

        if (longdate.split(':').length>2) {
            longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
        }

        return longdate
    }

    return (
        <ListItem> 
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText className={classes.shortLabel} primary="Starting" />
            <TextField
                className={classes.input}
                type="datetime-local"
                id={'specstart'}
                margin={"normal"}
                value={props.value ? props.value : shortTimeFormat() }
                onChange={(e) => props.change(props.target, e.target.value)}
            />
            { props.remove ?
                <ListItemSecondaryAction>
                    <IconButton onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                </ListItemSecondaryAction>
                : null
            }
        </ListItem>
    )
}
