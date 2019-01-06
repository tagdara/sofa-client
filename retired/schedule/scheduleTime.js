import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GridItem from '../GridItem'

const useStyles = makeStyles({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
    },

});


export default function ScheduleTime(props) {

    const classes = useStyles();
    const intervalUnits =  ['days','hours','minutes']

    return (
        <GridItem>
            <ListItem> 
                <Avatar className={ classes.activeIcon } onClick={ () => props.clear(props.target) }><ScheduleIcon /></Avatar>
                <ListItemText className={ classes.shortLabel} primary="At" />
                <TextField
                    className={classes.input}
                    type="time"
                    margin={"normal"}
                    value={props.value}
                    onChange={(e) => props.change(props.target, e.target.value)}
                />
            </ListItem>
        </GridItem>
    )
}
