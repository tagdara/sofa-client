import React from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';

export default function AdapterItem(props) { 

    return (
        <GridItem wide={props.wide} >
            <ListItem onClick={() => props.open(props.name)}>
                <ToggleAvatar avatarState={"on"}>{props.name.charAt()}</ToggleAvatar>
                <ListItemText primary={props.name} secondary={props.url}/>
            </ListItem>
            <ListItem>
                <ListItemIcon onClick={ () => props.restart(props.name) }><ReplayIcon /></ListItemIcon>
                <ListItemText primary={props.startup}/>
            </ListItem>

       </GridItem>
    );
}

