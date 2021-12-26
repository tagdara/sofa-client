import React from 'react';
import { Button, Card, Group, Text } from '@mantine/core';

export default function LoginReload(props) {
    
    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    } 

    return (
        <Card>
            <Group direction="column" noWrap grow>
                <Text>{"Attempting to connect"} </Text >
                <Button color="primary" fullWidth onClick={ ()=> reloadPWA()}>
                    RELOAD
                </Button>
            </Group>
        </Card>
    )
};