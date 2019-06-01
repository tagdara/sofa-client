import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListIcon from '@material-ui/icons/List';

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
        console.log('Activating', "logic:scene:"+props.name)
        setWorking(true)
        props.sendAlexaCommand(props.name, "logic:scene:"+props.name, "SceneController", "Activate")
    }
    
    return (
        <GridItem >
            <ListItem onClick={ () => runScene(name)}>
                { working ?
                    <CircularProgress size={32} className={classes.working} />
                :
                    <ToggleAvatar avatarState={props.endpointId==props.computedLevel ? 'on' : 'off'}>
                        {props.shortcut=='x' ? <ListIcon /> : props.shortcut }
                    </ToggleAvatar>
                }
                <ListItemText>{props.name}</ListItemText>
            </ListItem>
        </GridItem >
    )
};


