import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton"
import CircularProgress from '@mui/material/CircularProgress';
import SofaListItem from "components/SofaListItem"
import CardBase from "components/CardBase"

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

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

const Scene = props => {
    
    const classes = useStyles();
    const [working, setWorking] = useState(false)
    const scene = useDeviceStore( state => state.devices[props.endpointId] )
    const sceneState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = scene.friendlyName

    useEffect(() => {
        register(props.endpointId, 'scene-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'scene-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, []) 

    useInterval(() => {
        setWorking(false)
    }, working ? 5000 : null);

    useEffect(() => {
        setWorking(false)
    }, [props.computedLevel]);

    if (!sceneState) { return null }

    function runScene() {
        if (!props.editing && !props.remove) {
            console.log('Activating', name)
            setWorking(true)
            directive(props.endpointId, 'SceneController', 'Activate')
        }
    }
    
    function deleteScene() {
        directive(props.endpointId, 'SceneController', 'Delete')
    }

    // noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true} noPaper={false} button={false} 

    return (
        <CardBase noPad={ props.small } highlight={props.highlight}>
        <SofaListItem  
            avatarBackground={false}
            avatar={ working ?
                <CircularProgress size={props.small ? 24 : 32} className={classes.working} />
            :   
                <>{ (!props.shortcut || props.shortcut==='x') ? <ListIcon /> : props.shortcut }</>
            }
            avatarState={props.endpointId === props.computedLevel ? 'on' : 'off'}
            avatarClick={runScene}
            labelClick={runScene}
            primary={name}
            small={props.small}
            secondaryActions={
                <>
                { props.remove &&
                    <IconButton size={"small"} onClick={() => deleteScene() }><CloseIcon /></IconButton>   
                }
                { props.edit &&
                    <IconButton size={"small"} onClick={() => props.edit(props.endpointId) }><EditIcon /></IconButton>   
                }
                </>
            }
        />
        </CardBase>
    )
}

export default Scene;
