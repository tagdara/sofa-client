import React from "react";
import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

export default function ErrorCard(props) {

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }

    return (
        <GridItem wide={props.wide}>
            <List>
                <ListItem>
                    <ToggleAvatar avatarState={"open"}><SentimentDissatisfiedIcon /></ToggleAvatar>
                    <ListItemText primary={props.name} secondary={props.message} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Reload"} onClick={() => reloadPWA() }/>
                </ListItem>
            </List>
        </GridItem>
    );

}
