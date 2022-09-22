import React from 'react';
import { Avatar, Button, Loader } from '@mantine/core'
import { IconLayoutGrid, IconPlayerPlay } from '@tabler/icons';
import useSceneController from 'endpoint-model/controller/SceneController/useSceneController'

const SceneItem = props => {
    
    const { name, running, active, activate} = useSceneController(props.endpointId, props.computedLevel)

    return (
        <Button.Group buttonBorderWidth={0} style={{ maxWidth: "100%", width: "100%", border: "none"}}>
            <Button 
                size="md"
                styles={{ 
                    root: {
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: 16,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    },
                    leftIcon: {
                        marginRight: 24,
                    },
                }}
                variant={ active ? "light" : "default" }
                fullWidth 
                leftIcon={
                    props.shortcut === "x" ?   
                        <IconLayoutGrid size={20} />
                    :
                        <Avatar size="xs">
                            { props.shortcut }
                        </Avatar>
                    }
            >
                { name }
            </Button>         

            <Button size="md" variant={ active ? "light" : "default" } onClick={activate}>
                { running ?
                    <Loader size={20} variant="dots" />
                :
                    <IconPlayerPlay size={20} />
                }
            </Button>
        </Button.Group>        
    )

}

export default SceneItem
