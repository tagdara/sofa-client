import React from 'react';
import { ActionIcon, Group, Header, MediaQuery, Burger, Text, useMantineTheme } from '@mantine/core';
import { CloudOff, Home, Maximize } from 'react-feather';
import { selectPage } from 'beta/helpers/layoutHelpers'
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
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Header height={64} padding="md" style={{ width: "100%"}}>
            {/* You can handle other responsive styles with MediaQuery component or createStyles function */}
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Burger
                    opened={props.opened}
                    onClick={() => props.setOpened(!props.opened) }
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
                <Text sx={{ flexGrow: 1 }}>Sofa</Text>
                <Group noWrap spacing="lg">
                { !props.connected && <ActionIcon size="md" variant="light" color="red"><CloudOff size={20} /></ActionIcon> }
                { !homePage && <ActionIcon variant="light" color="primary" size="md" onClick={ () => selectPage('Stacks')}><Home size={20} /></ActionIcon> }
                <ActionIcon size="md" onClick={goFullScreen}><Maximize size={20} /></ActionIcon>
                </Group>
            </div>
            </Header>
        </MediaQuery>
    )
}

export default FrameHeader