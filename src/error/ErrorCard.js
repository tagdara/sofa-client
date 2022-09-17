import React from "react";
import { Avatar, Card, Group, Text } from '@mantine/core';
import { reloadPWA } from 'store/reloadPWA'
import { IconSkull } from '@tabler/icons';

export default function ErrorCard(props) {

    return (
        <Card onClick={() => reloadPWA() }>
            <Group>
                <Avatar><IconSkull size={20} /></Avatar>
                <Text>{props.name+" "+props.message}</Text>
            </Group>
        </Card>
    );

}
