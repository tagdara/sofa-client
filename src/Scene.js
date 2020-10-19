import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ButtonItem from "./ButtonItem"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => {
    return {        
        listItem: {
            padding: "8px 8px",
        },
        working: {
            marginLeft: 4,
        },
    }
});

function useInterval(callback, delay) {
    
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }

    }, [delay]);
}

export default function Scene(props) {
    
    const classes = useStyles();
    const [working, setWorking] = useState(false)

    useInterval(() => {
        setWorking(false)
    }, working ? 5000 : null);

    useEffect(() => {
        setWorking(false)
    }, [props.computedLevel]);
    
    function runScene() {
        if (!props.editing && !props.remove) {
            console.log('Activating', props.scene.friendlyName)
            setWorking(true)
            props.directive(props.scene.endpointId, 'SceneController', 'Activate')
        }
    }
    
    function deleteScene(endpointId) {
        props.directive(props.scene.endpointId, 'SceneController', 'Delete')
    }

    // noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true} noPaper={false} button={false} 

    return (
        <ButtonItem highlight={props.highlight} avatarBackground={false}
            avatarIcon={ working ?
                <CircularProgress size={props.small ? 24 : 32} className={classes.working} />
            :   
                <>
                    {props.shortcut==='x' ? <ListIcon /> : props.shortcut }
                </>
            }
            avatarState={props.scene.endpointId===props.computedLevel ? 'on' : 'off'}
            label={props.scene.friendlyName}
            action={runScene}
            small={props.small}
            secondary={
                <>
                { props.remove &&
                    <IconButton size={"small"} onClick={() => deleteScene() }><CloseIcon /></IconButton>   
                }
                { props.editing &&
                    <IconButton size={"small"} onClick={() => props.edit(props.scene) }><EditIcon /></IconButton>   
                }
                </>
            }
        />
    )
};


