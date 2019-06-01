import React, { Component } from "react";
import { makeStyles } from '@material-ui/styles';

import GridItem from './GridItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    
    spinner: {
        margin: 0,
    }
    
});

export default function PlaceholderCard(props){
    
    const classes = useStyles();
    
    return (
        <GridItem wide={true} nopaper={true} >

        </GridItem>
    );

}

