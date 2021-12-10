import React, { useState, useEffect, useRef } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'
import { Avatar, Button } from '@mantine/core'
import { List as ListIcon } from 'react-feather'

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

const SceneButton = props => {
    
    const [working, setWorking] = useState(false)
    const scene = useDeviceStore( state => state.devices[props.endpointId] )
    const sceneState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(props.endpointId, "scenebutton"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "scenebutton"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])
  

    useInterval(() => {
        setWorking(false)
    }, working ? 5000 : null);

    useEffect(() => {
        setWorking(false)
    }, [props.computedLevel]);

    if (!sceneState) { return null }

    const name = scene.friendlyName

    function runScene() {
        if (!props.editing && !props.remove) {
            console.log('Activating', name)
            setWorking(true)
            directive(props.endpointId, 'SceneController', 'Activate')
        }
    }
    
    const active = props.endpointId === props.computedLevel

    return (
        <Button fullWidth variant={active ? 'filled' : 'light'}
                leftIcon={ props.shortcut === "x" ? <ListIcon size={14} /> : <Avatar size="xs">{ props.shortcut }</Avatar> }
                onClick={ runScene }
                loading={ working }
        >
            { name }
        </Button>
    )
}

export default SceneButton
