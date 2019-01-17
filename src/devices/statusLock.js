import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from '../ToggleAvatar';
import GridItem from '../GridItem';

import DialpadIcon from '@material-ui/icons/Dialpad';

export default function StatusLock(props) {

    return (
        <GridItem wide={props.wide}>
            <ListItem >
                { props.status=='NOT_DETECTED' ?
                    <ToggleAvatar avatarState={"closed"} onClick={ () => props.handlePress(props.commands.hasOwnProperty('toggle') ? 'toggle':'unlock') }><DialpadIcon /></ToggleAvatar>
                :
                    <ToggleAvatar avatarState={"open"} onClick={ () => props.handlePress(props.commands.hasOwnProperty('toggle') ? 'toggle':'lock') }> <DialpadIcon /></ToggleAvatar>
                }                
                <ListItemText primary={props.name} secondary={props.status=='NOT_DETECTED' ? 'Closed' : 'Open'} />
            </ListItem>
        </GridItem>
    );

}