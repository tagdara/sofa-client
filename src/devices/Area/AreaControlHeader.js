import React from 'react';
import { ActionIcon, Avatar, Divider, Group, Title } from '@mantine/core'
import { IconDots, IconHome, IconBuildingWarehouse } from '@tabler/icons';
import LightChristmasButton from 'devices/Light/LightChristmasButton'

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
            <Group noWrap style={{ width: "100%"}} position="apart">
                <Group onClick={toggleArea}>
                    <Avatar size="lg">
                        <IconBuildingWarehouse size={24} />
                    </Avatar>
                    <Title order={4} >{props.name === "all" ? "All Areas" : props.name + " Lights"}</Title>
                </Group>
                <Group>
                    <LightChristmasButton />
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
            </Group>
            <Divider />
        </>
    )
};

export default AreaControlHeader