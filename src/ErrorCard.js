import React from "react";
import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

export default function ErrorCard(props) {

    return (
        <GridItem wide={props.wide}>
            <ListItem>
                <ToggleAvatar avatarState={"open"}><SentimentDissatisfiedIcon /></ToggleAvatar>
                <ListItemText primary={props.name} secondary={props.message} />
            </ListItem>
        </GridItem>
    );

}
