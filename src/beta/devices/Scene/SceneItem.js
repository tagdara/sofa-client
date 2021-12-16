import React, { useState, useEffect, useRef } from 'react';
import { directive } from 'store/directive'
import { ActionIcon, Avatar, Loader } from '@mantine/core'
import { Grid } from 'react-feather'
import { SplitButtonGroup, SplitButton } from 'beta/components/SplitButton'
import { useRegister } from 'store/useRegister'

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

const SceneItem = props => {
    
    const [working, setWorking] = useState(false)
    const { device, deviceState } = useRegister(props.endpointId)
    const scene = device
    const sceneState = deviceState

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
        <SplitButtonGroup on={active} onClick={ runScene }>
            <SplitButton >       
                { props.shortcut === "x" ?   
                    <ActionIcon size="md" >
                        <Grid size={20} />
                    </ActionIcon>
                :
                    <Avatar size="xs">
                        { props.shortcut }
                    </Avatar>
                }
            </SplitButton>
            <SplitButton    label = { name } 
                            on={active}
            />
            <SplitButton>
                { working &&
                    <Loader size={20} />
                }
            </SplitButton>
        </SplitButtonGroup>
    )

}

export default SceneItem
