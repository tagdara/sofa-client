import React from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';

import Moment from 'react-moment';
import 'moment-timezone';

export default function AdapterItem(props) { 

    return (
        <GridItem wide={props.wide} >
            <ListItem button onClick={() => props.open(props.adapter.endpointId)}>
                <ToggleAvatar avatarState={props.adapter.AdapterHealth.logged.value.ERROR > 5 ? "on": "closed"}>{props.adapter.friendlyName.charAt()}</ToggleAvatar>
                <ListItemText primary={props.adapter.friendlyName} secondary={props.adapter.AdapterHealth.url.value}/>
            </ListItem>
            <ListItem button onClick={ () => props.restart(props.adapter.endpointId) }>
                <ListItemIcon><ReplayIcon /></ListItemIcon>
                <ListItemText primary={<Moment format="ddd MMM D h:mm:sa">{props.adapter.AdapterHealth.startup.value}</Moment>} secondary={props.adapter.AdapterHealth.logged.value.ERROR<1? "No errors" : "Errors: "+props.adapter.AdapterHealth.logged.value.ERROR} />
            </ListItem>
       </GridItem>
    );
}

