import React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';


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
