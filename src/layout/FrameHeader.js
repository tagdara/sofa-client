import React from 'react';
import { ActionIcon, Group, Header, Burger, Text, useMantineTheme } from '@mantine/core';
import { IconHome, IconMaximize } from '@tabler/icons';
import { selectPage } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'

const FrameHeader = props => {

    const currentPage = useLayoutStore( state => state.currentPage)
    const homePage = currentPage === "Stacks"

    const theme = useMantineTheme();

    const goFullScreen = () => {
        const root = document.getElementById("root")
        if (root.requestFullscreen) {
            root.requestFullscreen();
        } 
    }

    return (
        <Header height={64} p="md" style={{ display: "flex", zIndex: 5001, width: "100%"}}>
            <Group style={{width: "100%"}} spacing={0}>
                <Burger
                    opened={props.opened}
                    onClick={() => props.setOpened(!props.opened) }
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
                <Text sx={{ flexGrow: 1 }}>Sofa</Text>
                <Group noWrap spacing="lg">
                { !homePage && <ActionIcon variant="light" color="primary" size="md" onClick={ () => selectPage('Stacks')}><IconHome size={20} /></ActionIcon> }
                <ActionIcon size="md" onClick={goFullScreen}><IconMaximize size={20} /></ActionIcon>
                </Group>
            </Group>
        </Header>
    )
}

export default FrameHeader