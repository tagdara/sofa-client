import React from 'react';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import GridItem from '../GridItem'

export default function ScheduleChoice(props) {

    return (
        <GridItem>
            <ListItem onClick={() => props.choose(props.target,props.value) }>
                <Avatar>{props.icon}</Avatar>
                <ListItemText primary={props.choice} secondary={props.desc} />
            </ListItem>
        </GridItem>
    )
}