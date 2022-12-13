import React from 'react';
import { ActionIcon, Divider, Group, Title } from '@mantine/core'
import { IconDots, IconHome, IconLamp } from '@tabler/icons';

const AreaControlHeader = (props) => {

    const toggleArea = (event) => {
        event.stopPropagation()
        if (props.currentArea !== props.home) {
            props.selectArea(props.home)
        } else {
            props.selectArea("area:all")
        }
    }

    return (
        <>
            <Group noWrap style={{ width: "100%"}} position="apart" onClick={toggleArea}>
                <Group>
                    <IconLamp size={20} />
                    <Title order={4} >{props.name === "all" ? "All Areas" : props.name + " Lights"}</Title>
                </Group>
                { props.currentArea !== props.home ?
                    <ActionIcon variant="light" color="primary" size="lg" onClick={toggleArea}>
                        <IconHome size={20} />
                    </ActionIcon >
                    :
                    <ActionIcon variant="light" color="primary" size="lg" onClick={toggleArea}>
                        <IconDots size={20} />
                    </ActionIcon >
                }
            </Group>
            <Divider />
        </>
    )
};

export default AreaControlHeader