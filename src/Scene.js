import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';
import ToggleAvatar from './ToggleAvatar';
import GridItem from "./GridItem"

const useStyles = makeStyles({
    
    root: {
        minHeight: 72,
        display: "flex",
        width: "100%",
    },
    listItem: {
        padding: "8 24px",
    }
});


export default function Scene(props) {
    
    const classes = useStyles();
    
    function runScene() {
        props.sendAlexaCommand(props.name, "logic:scene:"+props.name, "SceneController", "Activate")
    }
    
    return (
        <GridItem >
            <ListItem >
                <ToggleAvatar avatarState={props.shortcut==props.computedLevel.toString() ? "on" : "off"} onClick={ () => runScene(name)}>
                    {props.shortcut=='x' ? <ListIcon /> : props.shortcut }
                </ToggleAvatar>
                <ListItemText>{props.name}</ListItemText>
            </ListItem>
        </GridItem >
    )
};


