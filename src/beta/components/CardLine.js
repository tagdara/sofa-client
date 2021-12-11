import React from 'react';
import { ActionIcon, Avatar, Group, Text } from '@mantine/core';

export default function CardLine(props) {

    return (
        <Group noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }} onClick={props.onClick} >
            { props.avatar && <Avatar src={props.avatar} /> }
            { props.icon &&
                <ActionIcon>
                    { props.icon }
                </ActionIcon>
            }           
            <Group direction="column" spacing={0} grow style={{ flexGrow: 1 }}>
                <Text lineClamp={1} size="lg" weight={500} style={{ flexGrow: 1 }}>
                    { props.primary }
                </Text>
                <Text color="dimmed" size="md" lineClamp={1}>
                    { props.secondary }
                </Text>
            </Group>
            { props.children }
        </Group> 
    )
}