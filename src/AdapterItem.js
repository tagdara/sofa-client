import React from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';

export default function AdapterItem(props) { 

    return (
        <GridItem wide={props.wide} >
            <ListItem onClick={() => props.open(props.name)}>
                <ToggleAvatar avatarState={"on"}>{props.name.charAt()}</ToggleAvatar>
                <ListItemText primary={props.name} secondary={props.url}/>
            </ListItem>
            <ListItem onClick={() => props.restart(props.name)}>
                <ToggleAvatar avatarState={"off"}><ReplayIcon /></ToggleAvatar>
                <ListItemText primary={props.startup}/>
            </ListItem>

       </GridItem>
    );
}

