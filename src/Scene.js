import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListIcon from '@material-ui/icons/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';

import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from './ToggleAvatar';
import GridItem from "./GridItem"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    
    root: {
        minHeight: 72,
        display: "flex",
        width: "100%",
    },
    listItem: {
        padding: "8 24px",
    },
    working: {
        margin: "4px 20px 4px 4px"
    }
});


export default function Scene(props) {
    
    const classes = useStyles();
    const [working, setWorking] = useState(false)
    
    useEffect(() => {
        setWorking(false)
    }, [props.computedLevel]);
    
    function runScene() {
        console.log('Activating', props.scene.friendlyName)
        setWorking(true)
        props.scene.SceneController.directive('Activate')
    }
    
    function deleteScene(endpointId) {
        props.scene.SceneController.directive("Delete")
    }
    
    return (
        <GridItem >
            <ListItem onClick={ () => runScene()}>
                { working ?
                    <CircularProgress size={32} className={classes.working} />
                :
                    <ToggleAvatar avatarState={props.scene.endpointId===props.computedLevel ? 'on' : 'off'}>
                        {props.shortcut==='x' ? <ListIcon /> : props.shortcut }
                    </ToggleAvatar>
                }
                <ListItemText>{props.scene.friendlyName}</ListItemText>
                { props.remove &&
                    <ListItemSecondaryAction className={classes.listItem}>
                        <ListItemIcon onClick={() => deleteScene() }><CloseIcon /></ListItemIcon>   
                    </ListItemSecondaryAction>
                }
            </ListItem>
        </GridItem >
    )
};


