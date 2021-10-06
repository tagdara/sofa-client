import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListIcon from '@material-ui/icons/List';
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import CircularProgress from '@material-ui/core/CircularProgress';

import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'

const useStyles = makeStyles(theme => {
    return {        
        listItem: {
            padding: "8px 8px",
        },
        working: {
            marginLeft: 4,
        },
        avatar: {
            height: 24,
            width: 24,
            fontSize: "10px !important",
            marginRight: 8,
        },
        avatarHighlight: {
            height: 24,
            width: 24,
            fontSize: "10px !important",
            backgroundColor: theme.palette.primary.light,
            marginRight: 8,
        },
        icon: {
            marginLeft: 2,
            marginRight: 10,
        },
        button: {
            display: "flex",
            justifyContent: "flex-start"
        }
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

const SceneButton = React.memo(props => {
    
    const classes = useStyles();
    const [working, setWorking] = useState(false)

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'SceneButton-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('SceneButton-'+props.endpointId);
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
    
    function startIcon() {
        if (working) {
            return <CircularProgress size={props.small ? 24 : 32} className={classes.working} />
        }
        if (props.shortcut !== "x") { return <Avatar className={active ? classes.avatarHighlight : classes.avatar }>{ props.shortcut }</Avatar>}
        return <ListIcon className={classes.icon} />
    }

    const active = props.endpointId === props.computedLevel


    return (
        <Button fullWidth variant={active ? "contained" : "outlined"} color={active ? "primary" : undefined } startIcon={startIcon()} 
                className={classes.button} onClick={runScene}>
            { name }
        </Button>
    )
}, deviceStatesAreEqual);

export default dataFilter(SceneButton)
