import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import LayersIcon from '@material-ui/icons/Layers';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles({
 
    iconSize: {
        height: 24,
        width: 24,
    },
    stack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    tile: {
        display: "flex",
        flexGrow: 1,
        height: 90,
        paddingRight: 8,
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
    },
    nostack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        boxSizing: "border-box",
        marginRight: 8,
    },
    lightSwitch: {
        marginLeft: 8,
    },
    listItem: {
        padding: "8px 16px 8px 16px",
    },
    lightbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    placeholder: {
        height: 57,
        width: "100%",
    }
});

export default function Region(props) {
    
    const classes = useStyles();
    
    return (
        <GridItem >
            <ListItem className={classes.listItem}>
                <ToggleAvatar avatarState={props.current==true ? "on" : "off"} onClick={() => props.setRegion(props.name) } >
                    <LayersIcon className={classes.iconSize} />
                </ToggleAvatar>
                <ListItemText onClick={() => props.setRegion(props.name) } >{props.name}</ListItemText>
                <IconButton>
                    <MoreHorizIcon className={classes.iconSize} onClick={() => props.setLayoutCard('RegionLayout', {"name": props.name })}/>
                </IconButton>
            </ListItem>
        </GridItem>
    );
}


