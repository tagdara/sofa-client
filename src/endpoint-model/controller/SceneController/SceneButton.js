import React from 'react';
import { Avatar, Button } from '@mantine/core'
import { IconLayoutGrid } from '@tabler/icons';
import useSceneController from 'endpoint-model/controller/SceneController/useSceneController'

const SceneButton = props => {

    const { name, running, active, activate} = useSceneController(props.endpointId, props.computedLevel)
    
    return (
        <Button fullWidth variant={active ? 'filled' : 'light'}
                leftIcon={ props.shortcut === "x" ? <IconLayoutGrid size={14} /> : <Avatar size="xs">{ props.shortcut }</Avatar> }
                onClick={ activate }
                loading={ running }
        >
            { name }
        </Button>
    )
}

export default SceneButton
