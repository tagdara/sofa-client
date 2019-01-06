import React from "react";
import PropTypes from 'prop-types';

import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

export default function ErrorCard(props) {

    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar avatarState={"open"}><SentimentDissatisfiedIcon /></ToggleAvatar>
                <ListItemText primary={props.name} secondary={props.message} />
            </ListItem>
        </GridItem>
    );

}
