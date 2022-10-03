import React from 'react';
import useLayoutStore from 'layout/layoutStore'
import { useMediaQuery } from '@mantine/hooks';
import { ActionIcon, Divider, Group, Modal, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconX } from '@tabler/icons';

const PullUpCard = props => {

    const theme = useMantineTheme();
    const wide = useMediaQuery('(min-width: 640px)');
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)

    const closeOverlay = () => {
        setStackPullUp(undefined)
    }

    return (
        <Modal 
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.80}
            overlayBlur={3}
            withCloseButton={false} 
            onClose={closeOverlay} 
            centered={wide} 
            transition={ wide ? "fade" : "slide-up"} duration={1000} 
            styles={{ 
                overlay: {
                    top: 0,
                },
                inner: {
                    top: wide ? undefined: "unset",
                    bottom: 72,
                }
            }}

            opened = {stackPullUp === props.name } 
        >
            <Stack spacing="xl">
                <Group position="apart" >
                    <Title order={3}>{props.title}</Title>
                    <ActionIcon onClick={closeOverlay}>
                        <IconX size={20} />
                    </ActionIcon>
                </Group>
                <Divider />
                { props.children }
            </Stack>    
        </Modal>
    )

}

export default PullUpCard
