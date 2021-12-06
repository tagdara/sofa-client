import React from 'react';
import { ActionIcon, Header, MediaQuery, Burger, Text, useMantineTheme } from '@mantine/core';
import { CloudOff, Maximize } from 'react-feather';

const FrameHeader = props => {

    const theme = useMantineTheme();

    const goFullScreen = () => {
        const root = document.getElementById("root")
        if (root.requestFullscreen) {
            root.requestFullscreen();
        } 
    }

    return (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Header height={70} padding="md" style={{ width: "100%"}}>
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
                { !props.connected && <ActionIcon variant="light" color="red"><CloudOff size={20} /></ActionIcon> }
                <ActionIcon onClick={goFullScreen}><Maximize size={20} /></ActionIcon>

            </div>
            </Header>
        </MediaQuery>
    )
}

export default FrameHeader