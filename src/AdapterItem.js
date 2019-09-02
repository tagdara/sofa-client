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
            <ListItem button onClick={() => props.open(props.adapter.endpointId)}>
                <ToggleAvatar avatarState={props.adapterstate.logged.ERROR > 5 ? "on": "closed"}>{props.adapter.friendlyName.charAt()}</ToggleAvatar>
                <ListItemText primary={props.adapter.friendlyName} secondary={props.adapterstate.url}/>
            </ListItem>
            <ListItem button onClick={ () => props.restart(props.adapter.endpointId) }>
                <ListItemIcon><ReplayIcon /></ListItemIcon>
                <ListItemText primary={<Moment format="ddd MMM D h:mm:sa">{props.adapterstate.startup}</Moment>} secondary={props.adapterstate.logged.ERROR<1? "No errors" : "Errors: "+props.adapterstate.logged.ERROR} />
            </ListItem>
       </GridItem>
    );
}

