import React from 'react';
import { useState, useEffect } from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';
import ErrorIcon from '@material-ui/icons/Error';

import Moment from 'react-moment';
import 'moment-timezone';


export default function AdapterItem(props) { 

    return (
        <GridItem wide={props.wide} >
            <ListItem button onClick={() => props.open(props.name)}>
                <ToggleAvatar avatarState={props.adapterdata.state.logged.ERROR > 5 ? "on": "closed"}>{props.name.charAt()}</ToggleAvatar>
                <ListItemText primary={props.name} secondary={props.url}/>
            </ListItem>
            <ListItem button onClick={ () => props.restart(props.name) }>
                <ListItemIcon><ReplayIcon /></ListItemIcon>
                <ListItemText primary={<Moment format="ddd MMM D h:mm:sa">{props.startup}</Moment>} secondary={props.adapterdata.state.logged.ERROR<1? "No errors" : "Errors: "+props.adapterdata.state.logged.ERROR} />
            </ListItem>
       </GridItem>
    );
}

