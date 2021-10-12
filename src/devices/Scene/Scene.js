import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from '@material-ui/core/CircularProgress';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import SofaListItem from "components/SofaListItem"
import CardBase from "components/CardBase"

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

const Scene = React.memo(props => {
    
    const classes = useStyles();
    const [working, setWorking] = useState(false)

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'Scene-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('Scene-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])    

    useInterval(() => {
        setWorking(false)
    }, working ? 5000 : null);

    useEffect(() => {
        setWorking(false)
    }, [props.computedLevel]);

    if (!props.deviceStateReady) { return null }

    const name = props.devices[props.endpointId].friendlyName

    function runScene() {
        if (!props.editing && !props.remove) {
            console.log('Activating', name)
            setWorking(true)
            props.directive(props.endpointId, 'SceneController', 'Activate')
        }
    }
    
    function deleteScene() {
        props.directive(props.endpointId, 'SceneController', 'Delete')
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
}, deviceStatesAreEqual);

export default dataFilter(Scene)