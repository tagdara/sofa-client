import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from  '@material-ui/core/TextField';

import ScheduleIcon from '@material-ui/icons/Schedule';
import EditIcon from '@material-ui/icons/Edit';

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'

const useStyles = makeStyles({
        
    dataInput: {
        width: 50,
        margin:0,
    },
    followText: {
        flexGrow: 0,
    },

});


export default function ScheduleDaysInterval(props) {

    const classes = useStyles();
    const intervalUnits =  ['days','hours','minutes']

    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar avatarState={parseInt(props.value)>0 ? 'on' : 'off'} onClick={ () => props.clear(props.target) }><ScheduleIcon /></ToggleAvatar>
                <ListItemText primary="Every" />
                <TextField
                    className={classes.dataInput}
                    id={'spectime'}
                    margin={"normal"}
                    type="number"
                    value={props.value}
                    onChange={(e) => props.change(props.target, e.target.value) }
                />
                <ListItemText className={classes.followText} primary="days" />
            </ListItem>
        </GridItem>
    )

}

