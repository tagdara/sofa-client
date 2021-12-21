import React from "react";
import { Avatar, Card, Group, Text } from '@mantine/core';
import { Frown } from 'react-feather'


export default function ErrorCard(props) {

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }

    return (
        <Card onClick={() => reloadPWA() }>
            <Group>
                <Avatar ><Frown size={20} /></Avatar>
                <Text>{props.name+" "+props.message}</Text>
            </Group>
        </Card>
    );

}
